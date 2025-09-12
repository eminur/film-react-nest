import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { AppConfigModule } from './app.config.module';
import { TypeORMConfigModule } from './typeorm.config.module'
import { FilmsRepositoryModule } from './repository/films.repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public/content/afisha'),
      serveRoot: '/content/afisha',
      serveStaticOptions: {
        index: false, // отключаем поиск index.html
      },
    }),
    AppConfigModule,
    TypeORMConfigModule,
    FilmsRepositoryModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, OrderService, FilmsService,],
})
export class AppModule { }
