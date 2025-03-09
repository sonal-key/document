import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { DocumentsModule } from './documents/document.module';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port:  5432,
      username:  'root',
      password:  'root',
      database:  'doc_mng',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    UsersModule,
    DocumentsModule,
    IngestionModule,
  ],
})
export class AppModule {}