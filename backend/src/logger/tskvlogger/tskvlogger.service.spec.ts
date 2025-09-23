import { Test, TestingModule } from '@nestjs/testing';
import { TskvLogger } from './tskvlogger.service';

describe('TskvLogger', () => {
  let service: TskvLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TskvLogger],
    }).compile();

    service = module.get<TskvLogger>(TskvLogger);
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should format log message in TSKV format', () => {
    service.log('Test message', 'extra1', 'extra2');

    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(
        /^level=log\tmessage=Test message\tparam0=extra1\tparam1=extra2$/,
      ),
    );
  });
});
