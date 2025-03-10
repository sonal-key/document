import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingestion } from './ingestion.entity';
import { Document } from "../documents/documents.entity"

@Injectable()
export class MockPythonService {
  constructor(
    @InjectRepository(Ingestion)
    private readonly ingestionRepository: Repository<Ingestion>,
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  // **Trigger Mock Ingestion Process**
  async triggerIngestion(documentId: string) {
    // Check if document exists
    const document = await this.documentRepository.findOne({ where: { id: documentId } });
    
    if (!document) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }
  
    // Proceed with ingestion
    document.status = 'processing';
    await this.documentRepository.save(document);
  
    const ingestion = this.ingestionRepository.create({
      document,  // Use the existing document entity
      status: 'processing',
    });
    
    await this.ingestionRepository.save(ingestion);
  
    // Simulate ingestion completion
    setTimeout(async () => {
      ingestion.status = 'completed';
      document.status = 'completed';
      await this.ingestionRepository.save(ingestion);
      await this.documentRepository.save(document);
    }, 5000);
  
    return { message: 'Ingestion started', ingestionId: ingestion.id };
  }
  
  // **Check Ingestion Status**
  async getIngestionStatus(ingestionId: string) {
    const ingestion = await this.ingestionRepository.findOne({ where: { id: ingestionId } });
    if (!ingestion) throw new NotFoundException("Ingestion not found");

    return {
      ingestionId: ingestion.id,
      documentId: ingestion.document,
      status: ingestion.status,
    };
  }

  // **Mock Embedding Retrieval API**
  async getEmbeddings(documentId: string) {
    return {
      documentId,
      embeddings: [
        [0.123, 0.456, 0.789],
        [0.987, 0.654, 0.321],
      ], // Simulated embedding vectors
    };
  }
}
