// films-repository.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import mongoose, { Mongoose } from 'mongoose';
import { AppConfig } from '../app.config.provider';
import { AppConfigModule } from '../app.config.module';
import { FilmsMockRepository } from './films-mock.repository';
import { FilmsMongoRepository } from './films-mongo.repository';
import { FilmsPostgresRepository } from './films-postgres.repository';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([Film, Schedule])],
  providers: [
    { provide: 'FilmsRepository.postgres', useClass: FilmsPostgresRepository },
    { provide: 'FilmsRepository.mongo', useClass: FilmsMongoRepository },
    { provide: 'FilmsRepository.mock', useClass: FilmsMockRepository },
    {
      provide: 'FilmsRepository',
      useFactory: (
        config: AppConfig,
        postgresRepo: FilmsPostgresRepository,
        mongoRepo: FilmsMongoRepository,
        mockRepo: FilmsMockRepository,
      ) => {
        console.log(`Current DB driver: ${config.database.driver}`);
        switch (config.database.driver) {
          case 'postgres':
            return postgresRepo;
          case 'mongodb':
            return mongoRepo;
          case 'mock':
            return mockRepo;
          default:
            throw new Error(
              `Unsupported DB driver: ${config.database.driver} . Allowed values "postgres","mongodb", "mock"`,
            );
        }
      },
      inject: [
        'CONFIG',
        'FilmsRepository.postgres',
        'FilmsRepository.mongo',
        'FilmsRepository.mock',
      ],
    },

    {
      provide: 'MONGO_CONNECTION',
      useFactory: async (config: AppConfig): Promise<Mongoose | null> => {
        if (config.database.driver !== 'mongodb') {
          return null;
        }
        return mongoose.connect(config.database.url);
      },
      inject: ['CONFIG'],
    },
  ],
  exports: ['FilmsRepository'],
})
export class FilmsRepositoryModule {}
