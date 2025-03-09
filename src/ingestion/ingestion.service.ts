// import { Injectable, NotFoundException, HttpService } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Ingestion } from './ingestion.entity';
// import { Document } from 'src/documents/documents.entity';
// @Injectable()
// export class IngestionService {
//   constructor(
//     @InjectRepository(Ingestion)
//     private readonly ingestionRepository: Repository<Ingestion>,
//     @InjectRepository(Document)
//     private readonly documentRepository: Repository<Document>,
//     private readonly httpService: HttpService, // For webhook/API calls
//   ) {}

//   // **Trigger Ingestion API** - Calls Python backend
//   async triggerIngestion(documentId: string) {
//     const document = await this.documentRepository.findOne({ where: { id: documentId } });
//     if (!document) {
//       throw new NotFoundException("Document not found");
//     }

//     // Create ingestion record with `pending` status
//     const ingestion = this.ingestionRepository.create({
//       documentId,
//       status: "pending",
//     });
//     await this.ingestionRepository.save(ingestion);

//     // Simulate calling Python backend (Replace with real URL)
//     const pythonWebhookUrl = "http://python-backend/api/ingest"; // Update as needed
//     try {
//       await this.httpService.post(pythonWebhookUrl, { documentId }).toPromise();
//       ingestion.status = "processing"; // Update status after successful API call
//     } catch (error) {
//       ingestion.status = "failed";
//       ingestion.errorMessage = error.message || "Failed to trigger ingestion";
//     }

//     await this.ingestionRepository.save(ingestion);
//     return ingestion;
//   }

//   // **Check Ingestion Status**
//   async getIngestionStatus(ingestionId: string) {
//     const ingestion = await this.ingestionRepository.findOne({ where: { id: ingestionId } });
//     if (!ingestion) throw new NotFoundException("Ingestion not found");

//     return {
//       ingestionId: ingestion.id,
//       documentId: ingestion.documentId,
//       status: ingestion.status,
//       errorMessage: ingestion.errorMessage || null,
//     };
//   }

//   // **Update ingestion status (called by Python backend)**
//   async updateIngestionStatus(ingestionId: string, status: string, errorMessage?: string) {
//     const ingestion = await this.ingestionRepository.findOne({ where: { id: ingestionId } });
//     if (!ingestion) throw new NotFoundException("Ingestion not found");

//     ingestion.status = status;
//     if (errorMessage) ingestion.errorMessage = errorMessage;

//     await this.ingestionRepository.save(ingestion);
//     return { message: "Ingestion status updated", status };
//   }
// }
