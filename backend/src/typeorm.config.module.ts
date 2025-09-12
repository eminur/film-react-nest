import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/entities/film.entity';
import { Schedule } from './films/entities/schedule.entity';
import { AppConfig } from './app.config.provider';
import { AppConfigModule } from './app.config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: ['CONFIG'], 
      useFactory: (config: AppConfig) => ({
        type: 'postgres',
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        entities: [Film, Schedule],
        synchronize: false, 
      }),
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  exports: [TypeOrmModule],
})
export class TypeORMConfigModule {}
