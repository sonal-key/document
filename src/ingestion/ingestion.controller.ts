import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger')
  triggerIngestion(@Body() ingestionDto) {
    return this.ingestionService.triggerIngestion(ingestionDto);
  }

  @Get('status/:id')
  getIngestionStatus(@Param('id') id: string) {
    return this.ingestionService.getIngestionStatus(id);
  }
}
