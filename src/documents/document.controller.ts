import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { DocumentsService } from './document.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  upload(@Body() documentDto) {
    return this.documentsService.upload(documentDto);
  }

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.documentsService.delete(id);
  }
}