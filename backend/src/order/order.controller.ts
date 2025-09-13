import { Controller, Body, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto, OrdersDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async createOrder(@Body() orderDto: OrderDto): Promise<OrdersDto> {
    return this.orderService.createOrder(orderDto.tickets);
  }
}
