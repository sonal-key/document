import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './documents.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  upload(documentDto) {
    const newDocument = this.documentsRepository.create(documentDto);
    return this.documentsRepository.save(newDocument);
  }

  findAll() {
    return this.documentsRepository.find();
  }

  delete(id: string) {
    return this.documentsRepository.delete(id);
  }
}