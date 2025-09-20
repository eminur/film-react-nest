import { Test, TestingModule } from '@nestjs/testing';
import { JsonLogger } from './jsonlogger.service';

describe('JsonLogger', () => {
  let service: JsonLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLogger],
    }).compile();

    service = module.get<JsonLogger>(JsonLogger);

    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log message as JSON', () => {
    service.log('Hello', 'world');

    expect(console.log).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: 'Hello',
        optionalParams: [['world']],
      }),
    );
  });
});
