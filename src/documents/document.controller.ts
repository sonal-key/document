import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DocumentService } from './document.service';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Documents')
@ApiBearerAuth() // Requires JWT Authentication in Swagger
@Controller('documents')
@UseGuards(AuthGuard('jwt')) // Ensure only authenticated users can access
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @ApiOperation({ summary: 'Upload a new document' })
  @Post('upload')
  async uploadDocument(@Request() req) {
    const user = req.user; // Extract user from JWT
    const fileName = `mock_file_${Date.now()}.pdf`;
    const fileType = 'application/pdf';
    const fileSize = 12345; // Dummy size
    console.log("user", user);
    
    return await this.documentService.uploadDocument(user, fileName, fileType, fileSize);
  }

  @ApiOperation({ summary: 'Get all documents' })
  @Get()
  async getAllDocuments() {
    return await this.documentService.getAllDocuments();
  }

  @ApiOperation({ summary: 'Get a document by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Document ID' })
  @Get(':id')
  async getDocumentById(@Param('id') id: string) {
    return await this.documentService.getDocumentById(id);
  }

  @ApiOperation({ summary: 'Update document status' })
  @ApiParam({ name: 'id', required: true, description: 'Document ID' })
  @Patch(':id/status')
  async updateDocumentStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return await this.documentService.updateDocumentStatus(id, body.status);
  }

  @ApiOperation({ summary: 'Delete a document' })
  @ApiParam({ name: 'id', required: true, description: 'Document ID' })
  @Delete(':id')
  async deleteDocument(@Param('id') id: string) {
    return await this.documentService.deleteDocument(id);
  }

  @ApiOperation({ summary: 'Get documents uploaded by a specific user' })
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @Get('user/:userId')
  async getDocumentsByUser(@Param('userId') userId: number) {
    return await this.documentService.getDocumentsByUser(userId);
  }
}
