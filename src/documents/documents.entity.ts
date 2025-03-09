import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.documents, { eager: true })
  user: User;

  @Column()
  fileName: string;

  @Column()
  fileUrl: string;

  @Column()
  fileType: string;

  @Column()
  fileSize: number;

  @Column({ default: 'pending' }) // Initially set to 'pending'
  status: string;

  @CreateDateColumn()
  uploadedAt: Date;

  @Column({default:null})
  userId: any;
}
