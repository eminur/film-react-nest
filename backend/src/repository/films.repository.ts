import { FilmDto } from '../films/dto/films.dto';
import { TicketDto } from '../order/dto/order.dto';

export interface FilmsRepository {
  findAll(): Promise<FilmDto[]>;
  findById(id: string): Promise<FilmDto | null>;
  takeSeat(ticket: TicketDto): Promise<{ success: boolean; ticketId: string }>;
}
