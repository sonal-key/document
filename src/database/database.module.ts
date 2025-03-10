import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingestion } from 'src/ingestion/ingestion.entity';
import { User } from 'src/user/user.entity';
import { Document } from 'src/documents/documents.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure ConfigModule is globally available
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is imported
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Document, Ingestion],
        synchronize: false,
        logging: configService.get<string>('NODE_ENV') === 'production' ? false : true,
        autoLoadEntities: false,
        useUTC: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
