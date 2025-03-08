import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('ingestions')
export class Ingestion {
  @PrimaryGeneratedColumn('uuid')
  id: string; // This must exist

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
