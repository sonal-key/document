import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { MockPythonService } from './mock-python.service';

@Controller('mock-python')
export class MockPythonController {
  constructor(private readonly mockPythonService: MockPythonService) {}

  // **Trigger Mock Ingestion**
  @Post('trigger')
  triggerIngestion(@Body() body) {
    return this.mockPythonService.triggerIngestion(body.documentId);
  }

  // **Get Ingestion Status**
  @Get('status/:id')
  getIngestionStatus(@Param('id') id: string) {
    return this.mockPythonService.getIngestionStatus(id);
  }

  // **Get Mocked Embeddings**
  @Get('embeddings/:documentId')
  getEmbeddings(@Param('documentId') documentId: string) {
    return this.mockPythonService.getEmbeddings(documentId);
  }
}
