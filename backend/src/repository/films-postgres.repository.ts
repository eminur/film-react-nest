import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { FilmsRepository } from './films.repository';
import { TicketDto } from '../order/dto/order.dto';
import { FilmDto, ScheduleDto } from '../films/dto/films.dto';
import { faker } from "@faker-js/faker";

@Injectable()
export class FilmsPostgresRepository implements FilmsRepository {
    constructor(@InjectRepository(Film) private readonly filmRepo: Repository<Film>,
        @InjectRepository(Schedule) private readonly scheduleRepo: Repository<Schedule>,
    ) { }

    // Маппер: Schedule -> ScheduleDto
    private toScheduleDto(entity: Schedule): ScheduleDto {
        return {
            id: entity.id,
            daytime: entity.daytime,
            hall: entity.hall,
            rows: entity.rows,
            seats: entity.seats,
            price: entity.price,
            taken: entity.taken ? entity.taken.split(',').filter(Boolean) : []
        };
    }
    // Маппер: Film -> FilmDto
    private toFilmDto(entity: Film): FilmDto {
        return {
            id: entity.id,
            rating: entity.rating,
            director: entity.director,
            tags: [entity.tags],
            image: entity.image,
            cover: entity.cover,
            title: entity.title,
            about: entity.about,
            description: entity.description,
            schedule: entity.schedules?.map(s => this.toScheduleDto(s)) ?? [],
        };
    }

    async findAll() {
        const films: Film[] = await this.filmRepo.find({ relations: ['schedules'] });
        return films.map(film => this.toFilmDto(film));
    }

    async findById(id: string) {
        const film = await this.filmRepo.findOne({
            where: { id },
            relations: ['schedules'],
            order: { schedules: { daytime: 'ASC', }, },
        });

        return this.toFilmDto(film);
    }

    async takeSeat(ticket: TicketDto) {

        // 1. Найдём расписание
        const schedule = await this.scheduleRepo.findOne({ where: { id: ticket.session } });

        if (!schedule) {
            throw new NotFoundException('Расписание не найдено');
        }

        // 2. Проверим, занято ли место
        if (schedule.taken.includes(`${ticket.row}:${ticket.seat}`)) {
            throw new ConflictException(`Место ${ticket.row}:${ticket.seat} уже занято`);
        }

        // 3. Добавим место
        if (schedule.taken) {
            schedule.taken = schedule.taken + `,${ticket.row}:${ticket.seat}`;
        } else {
            schedule.taken = `${ticket.row}:${ticket.seat}`;
        }

        await this.scheduleRepo.save(schedule);

        return { success: true, ticketId: faker.string.uuid() };
    }

}
