import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingestion } from './ingestion.entity';
import { IngestionDto } from './injection.dto';

@Injectable()
export class IngestionService {
  constructor(
    @InjectRepository(Ingestion)
    private ingestionRepository: Repository<Ingestion>,
  ) {}

  async triggerIngestion(ingestionDto) {
    const ingestion:any = this.ingestionRepository.create({ status: 'processing', ...ingestionDto });
    await this.ingestionRepository.save(ingestion);

    // Simulate processing delay
    setTimeout(async () => {
      try {
        const updatedIngestion = await this.ingestionRepository.findOneBy({ id: ingestion.id });

        if (updatedIngestion) {
          updatedIngestion.status = 'completed';
          await this.ingestionRepository.save(updatedIngestion);
        }
      } catch (error) {
        console.error('Error updating ingestion status:', error);
      }
    }, 5000);

    return ingestion;
  }

  async getIngestionStatus(id: string) {
    console.log("Fetching ingestion status for ID:", id);

    const ingestion = await this.ingestionRepository.findOneBy({ id });

    console.log("Fetched ingestion record:", ingestion);

    if (!ingestion) {
      throw new NotFoundException(`Ingestion record with ID ${id} not found`);
    }

    return { id: ingestion.id, status: ingestion.status };
  }
}
