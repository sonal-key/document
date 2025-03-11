import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingestion } from './ingestion.entity';
import { MockPythonService } from './mock-python.service';
import { MockPythonController } from './mock-python.controller';
import {Document} from "documents/documents.entity"
@Module({
  imports: [TypeOrmModule.forFeature([Ingestion,Document])],
  controllers: [MockPythonController],
  providers: [MockPythonService],
  exports: [MockPythonService],
})
export class IngestionModule {}
