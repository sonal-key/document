import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Document } from './documents.entity';
@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async uploadDocument(user: any, fileName: string, fileType: string, fileSize: number) {
    console.log("User before saving document:", user);
  
    // Ensure user ID exists
    // if (!user || !user.id) {
    //   throw new Error("User is not valid. Ensure the user exists and has an ID.");
    // }
  let res:any = this.userRepository.find({where: {email:user.email}})
  console.log(":ressss",res)
    const document = this.documentRepository.create({
      user:res.id, // Must have a valid ID
      fileName,
      fileUrl: `https://dummy-s3-bucket.com/${fileName}`, // Mock S3 URL
      fileType,
      fileSize,
      status: 'uploaded',
    });
  
    console.log("Document before saving:", document);
  
    return await this.documentRepository.save(document);
  }
  

  async getAllDocuments() {
    return await this.documentRepository.find();
  }

  async getDocumentById(id: string) {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) throw new NotFoundException('Document not found');
    return document;
  }

  async updateDocumentStatus(id: string, status: string) {
    const document = await this.getDocumentById(id);
    document.status = status;
    await this.documentRepository.save(document);
    return { message: 'Document status updated successfully' };
  }

  async deleteDocument(id: string) {
    const document = await this.getDocumentById(id);
    await this.documentRepository.remove(document);
    return { message: 'Document deleted successfully' };
  }

  async getDocumentsByUser(userId: number) {
    return await this.documentRepository.find({ where: { user: { id: userId } } });
  }
}
