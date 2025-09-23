import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn(),
        getSchedule: jest.fn(),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('.getFilms() should call getAll method of the service', () => {
    controller.getFilms();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('.getFilmSchedule() should call getSchedule method of the service', () => {
    controller.getFilmSchedule('id');
    expect(service.getSchedule).toHaveBeenCalled();
  });
});
