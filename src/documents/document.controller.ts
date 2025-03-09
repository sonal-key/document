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

@Controller('documents')
@UseGuards(AuthGuard('jwt')) // Ensure only authenticated users can access
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  async uploadDocument(@Request() req) {
    const user = req.user; // Extract user from JWT
    const fileName = `mock_file_${Date.now()}.pdf`;
    const fileType = 'application/pdf';
    const fileSize = 12345; // Dummy size
console.log("userrrr",user)
    const document = await this.documentService.uploadDocument(user, fileName, fileType, fileSize);
    return document;
  }

  @Get()
  async getAllDocuments() {
    return await this.documentService.getAllDocuments();
  }

  @Get(':id')
  async getDocumentById(@Param('id') id: string) {
    return await this.documentService.getDocumentById(id);
  }

  @Patch(':id/status')
  async updateDocumentStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return await this.documentService.updateDocumentStatus(id, body.status);
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: string) {
    return await this.documentService.deleteDocument(id);
  }

  @Get('user/:userId')
  async getDocumentsByUser(@Param('userId') userId: number) {
    return await this.documentService.getDocumentsByUser(userId);
  }
}
