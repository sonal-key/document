import { IsOptional, IsString } from 'class-validator';

export class IngestionDto {
  @IsOptional()
  @IsString()
  source?: string; // Example: Data source name

  @IsOptional()
  @IsString()
  type?: string; // Example: Ingestion type
}
