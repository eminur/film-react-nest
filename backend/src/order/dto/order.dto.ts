//TODO реализовать DTO для /orders

export class TicketDto {
  film: string; // UUID фильма
  session: string; // UUID сеанса
  daytime: string; // Дата/время сеанса (ISO)
  row: number; // Ряд
  seat: number; // Место
  price: number; // Цена
  id: string;
}
export class OrderDto {
  email: string;
  phone: string;
  tickets: TicketDto[];
}

export class OrdersDto {
  total: number;
  items: TicketDto[];
}
