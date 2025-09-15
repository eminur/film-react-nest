import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsDto, FilmScheduleDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  @Get()
  async getFilms(): Promise<FilmsDto> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string): Promise<FilmScheduleDto> {
    return this.filmsService.getSchedule(id);
  }
}
