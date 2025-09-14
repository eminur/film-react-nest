import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { TicketDto } from '../order/dto/order.dto';
import { Model, Mongoose } from 'mongoose';
import { FilmDocument, FilmSchema } from './schema/film.schema';
import { randomUUID } from 'crypto';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsMongoRepository implements FilmsRepository {
  private filmModel: Model<FilmDocument> | null = null;

  constructor(@Inject('MONGO_CONNECTION') private connection: Mongoose | null) {
    if (this.connection) {
      this.filmModel = this.connection.model<FilmDocument>('Film', FilmSchema);
    }
  }

  private get model(): Model<FilmDocument> {
    if (!this.filmModel) {
      throw new Error('Mongo connection is not initialized. Make sure driver="mongodb" is set in config.',);
    }
    return this.filmModel;
  }
  async findAll() {
    return this.model.find().exec();
  }

  async findById(id: string) {
    return this.model.findOne({ id }).exec();
  }

  async takeSeat(ticket: TicketDto) {
    // 1. Найдём фильм и расписание
    const film = await this.model.findOne(
      { id: ticket.film, 'schedule.id': ticket.session },
      { 'schedule.$': 1 }, // берём только нужное расписание
    );

    if (!film || !film.schedule?.length) {
      throw new NotFoundException('Фильм или расписание не найдено');
    }

    const schedule = film.schedule[0];

    // 2. Проверим, занято ли место
    if (schedule.taken.includes(`${ticket.row}:${ticket.seat}`)) {
      throw new ConflictException(
        `Место ${ticket.row}:${ticket.seat} уже занято`,
      );
    }

    // 3. Добавим место (гарантия уникальности через $addToSet)
    await this.model.updateOne(
      { id: ticket.film, 'schedule.id': ticket.session },
      { $addToSet: { 'schedule.$.taken': `${ticket.row}:${ticket.seat}` } },
    );

    return { success: true, ticketId: randomUUID() };
  }
}
