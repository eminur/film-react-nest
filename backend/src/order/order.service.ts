import { Injectable, Inject } from '@nestjs/common';
import { OrderDto, OrdersDto, TicketDto } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
    constructor(
        @Inject('FilmsRepository')
        private readonly filmsRepository: FilmsRepository,
    ) { }

    async createOrder(items: TicketDto[]): Promise<OrdersDto> {
        let tickets: TicketDto[] = [];
        for (const element of items) {
            const result = await this.filmsRepository.takeSeat(element);
            if (result.success) {
                tickets.push({ ...element, id: result.ticketId });
            }
        }

        return { total: tickets.length, items: tickets };

    }
}
