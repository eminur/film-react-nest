import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { configProvider, AppConfig } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsRepositoryMock } from './repository/films-mock.repository';
import { FilmsMongoRepository, } from './repository/films-mongo.repository';
import { AppConfigModule } from './app.config.module';
import mongoose, { Mongoose } from 'mongoose';
import { TypeORMConfigModule } from './typeorm.config.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/entities/film.entity';
import { Schedule } from './films/entities/schedule.entity';
import { FilmsPostgresRepository, } from './repository/films-postgres.repository';

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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'root',
      database: 'films',
      entities: [Film, Schedule],
      synchronize: false,
    })
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    OrderService,
    FilmsService,
    //{ provide: 'FilmsRepository', useClass: FilmsMongoRepository },
    //{ provide: 'FilmsRepository', useClass: FilmsRepositoryMock },
    { provide: 'FilmsRepository', useClass: FilmsPostgresRepository },
    {
      provide: 'MONGO_CONNECTION',
      useFactory: async (config: AppConfig): Promise<Mongoose> => {
        if (config.database.driver !== 'mongodb') {
          throw new Error(`Unsupported DB driver: ${config.database.driver}`);
        }
        const connection = await mongoose.connect(config.database.url);
        return connection;
      },
      inject: ['CONFIG'],
    },
  ],

  exports: ['FilmsRepository'],
})
export class AppModule { }
