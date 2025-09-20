import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { TskvLogger } from './logger/tskvlogger/tskvlogger.service';
import { JsonLogger } from './logger/jsonlogger/jsonlogger.service';
import { DevLogger } from './logger/devlogger/devlogger.service';
import { configProvider } from './app.config.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  switch (configProvider.useValue.logger.type) {
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
    default:
      app.useLogger(new DevLogger());
      break;
  }

  await app.listen(3000);
}
bootstrap();
