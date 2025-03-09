import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { MockPythonService } from './mock-python.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Mock Python Ingestion') // Groups endpoints in Swagger
@Controller('mock-python')
export class MockPythonController {
  constructor(private readonly mockPythonService: MockPythonService) {}

  @ApiOperation({ summary: 'Trigger Mock Ingestion' })
  @Post('trigger')
  triggerIngestion(@Body() body) {
    return this.mockPythonService.triggerIngestion(body.documentId);
  }

  @ApiOperation({ summary: 'Get Ingestion Status' })
  @ApiParam({ name: 'id', required: true, description: 'Ingestion process ID' })
  @Get('status/:id')
  getIngestionStatus(@Param('id') id: string) {
    return this.mockPythonService.getIngestionStatus(id);
  }

  @ApiOperation({ summary: 'Get Mocked Embeddings' })
  @ApiParam({ name: 'documentId', required: true, description: 'Document ID' })
  @Get('embeddings/:documentId')
  getEmbeddings(@Param('documentId') documentId: string) {
    return this.mockPythonService.getEmbeddings(documentId);
  }
}
