import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  userId: User;

  @Column()
  fileName: string;

  @Column()
  fileUrl: string;

  @Column()
  fileType: string;

  @Column()
  fileSize: number;

  @Column({ default: 'uploaded' })
  status: string;

  @CreateDateColumn()
  uploadedAt: Date;

  
}