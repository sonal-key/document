import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from './document.controller';
import { Document } from './documents.entity';
import { DocumentService } from './document.service';
import { User } from 'src/user/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Document,User])],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentsModule {}
