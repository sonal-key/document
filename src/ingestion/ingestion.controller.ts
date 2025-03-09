// import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
// import { IngestionService } from './ingestion.service';

// @Controller('ingestion')
// export class IngestionController {
//   constructor(private readonly ingestionService: IngestionService) {}

//   @Post('trigger')
//   async triggerIngestion(@Body() { documentId }: { documentId: string }) {
//     return this.ingestionService.triggerIngestion(documentId);
//   }

//   @Get('status/:id')
//   async getIngestionStatus(@Param('id') id: string) {
//     return this.ingestionService.getIngestionStatus(id);
//   }

//   @Patch('status/update/:id')
//   async updateIngestionStatus(
//     @Param('id') ingestionId: string,
//     @Body() { status, errorMessage }: { status: string; errorMessage?: string },
//   ) {
//     return this.ingestionService.updateIngestionStatus(ingestionId, status, errorMessage);
//   }
// }
