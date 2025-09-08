//TODO описать DTO для запросов к /films

export class ScheduleDto {
  id: string;            // UUID сеанса
  daytime: string;       // Дата и время показа (ISO)
  hall: number;          // Номер зала
  rows: number;          // Количество рядов
  seats: number;         // Количество мест в ряду
  price: number;         // Цена билета
  taken: string[];       // Занятые места в формате "ряд:место"
}

export class FilmScheduleDto {
  total: number;
  items: ScheduleDto[];
}

export class FilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: ScheduleDto[]
}

export class FilmsDto {
  total: number;
  items: FilmDto[];
}

