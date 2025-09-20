import { Test, TestingModule } from '@nestjs/testing';
import { DevLogger } from './devlogger.service';

describe('DevLogger', () => {
  let service: DevLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevLogger],
    }).compile();

    service = module.get<DevLogger>(DevLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
