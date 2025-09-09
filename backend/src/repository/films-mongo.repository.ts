import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { TicketDto } from '../order/dto/order.dto';
import { Model, Mongoose } from 'mongoose';
import { FilmDocument, FilmSchema } from './schema/film.schema';
import { faker } from "@faker-js/faker";
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsMongoRepository implements FilmsRepository {
    private filmModel: Model<FilmDocument>;

    constructor(@Inject('MONGO_CONNECTION') private connection: Mongoose) {
        this.filmModel = this.connection.model<FilmDocument>('Film', FilmSchema);
    }

    async findAll() {
        return this.filmModel.find().exec();
    }

    async findById(id: string) {
        return this.filmModel.findOne({ id }).exec();
    }

    async takeSeat(ticket: TicketDto) {

        // 1. Найдём фильм и расписание
        const film = await this.filmModel.findOne(
            { 'id': ticket.film, 'schedule.id': ticket.session },
            { 'schedule.$': 1 }, // берём только нужное расписание
        );

        if (!film || !film.schedule?.length) {
            throw new NotFoundException('Фильм или расписание не найдено');
        }

        const schedule = film.schedule[0];

        // 2. Проверим, занято ли место
        if (schedule.taken.includes(`${ticket.row}:${ticket.seat}`)) {
            throw new ConflictException(`Место ${ticket.row}:${ticket.seat} уже занято`);
        }

        // 3. Добавим место (гарантия уникальности через $addToSet)
        await this.filmModel.updateOne(
            { 'id': ticket.film, 'schedule.id': ticket.session },
            { $addToSet: { 'schedule.$.taken': `${ticket.row}:${ticket.seat}` } },
        );

        return { success: true, ticketId: faker.string.uuid() };

    }

}