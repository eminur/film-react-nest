import { Injectable, Inject } from '@nestjs/common';
import { FilmDto, FilmsDto, FilmScheduleDto } from './dto/films.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FilmsRepository')
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async findAll(): Promise<FilmsDto> {
    const items = await this.filmsRepository.findAll();
    return { total: items.length, items };
  }

  async getSchedule(id: string): Promise<FilmScheduleDto> {
    const film: FilmDto = await this.filmsRepository.findById(id);
    return { total: film.schedule.length, items: film.schedule };
  }
}
