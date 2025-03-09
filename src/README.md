# NestJS Document Management System

## Overview
This project is a **NestJS-based Document Management System** with **User Authentication, Document Uploading, and Ingestion Processing**.

## Features
- **User Authentication** (JWT-based login, register, role-based access control)
- **Document Management** (CRUD operations, file uploads to S3)
- **Ingestion Process** (Simulated Python backend using a Mock Service)
- **Status Tracking** (Monitoring document ingestion and processing status)

## Tech Stack
- **Backend**: NestJS (TypeScript)
- **Database**: PostgreSQL (TypeORM for ORM)
- **Cloud Storage**: AWS S3 (Mock URL used for now)
- **Authentication**: JWT-based auth
- **Simulated Python Backend**: Mock ingestion service in NestJS

## Installation
### **1. Clone the repository**
```sh
git clone https://github.com/sonal-key/document.git
cd nestjs-document-mgmt
```

### **2. Install dependencies**
```sh
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file and configure database and other settings:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/document_db
JWT_SECRET=your_jwt_secret
AWS_S3_BUCKET=dummy-s3-bucket
```



### **5. Start the Application**
```sh
npm run start:dev
```

## API Endpoints
### **User Authentication**
| Method | Endpoint         | Description         |
|--------|-----------------|---------------------|
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | User login (JWT)   |

### **Document Management**
| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| POST   | `/documents/upload` | Upload a new document       |
| GET    | `/documents`        | Get all documents           |
| GET    | `/documents/:id`    | Get a specific document     |
| DELETE | `/documents/:id`    | Delete a document           |

### **Ingestion Process (Mock Python API)**
| Method | Endpoint              | Description                     |
|--------|----------------------|---------------------------------|
| POST   | `/ingestion/trigger` | Trigger document ingestion     |
| GET    | `/ingestion/status/:id` | Get ingestion status          |

## Mocking Python Backend
Since this project simulates a Python backend for ingestion, a **Mock Ingestion Service** is implemented in NestJS. When a document ingestion request is triggered, it:
- Saves ingestion status as `processing`
- After 5 seconds, updates the status to `completed`

## Database Schema
### **User Entity**
```ts
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column() username: string;
  @Column() email: string;
  @Column() password: string;
  @Column({ default: 'user' }) role: string;
}
```
### **Document Entity**
```ts
@Entity('documents')
class Document {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() fileName: string;
  @Column() fileUrl: string;
  @Column() fileType: string;
  @Column() fileSize: number;
  @Column({ default: 'uploaded' }) status: string;
  @ManyToOne(() => User, (user) => user.documents) user: User;
}
```
### **Ingestion Entity**
```ts
@Entity('ingestions')
class Ingestion {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ default: 'pending' }) status: string;
  @CreateDateColumn() createdAt: Date;
  @ManyToOne(() => Document, (document) => document.ingestions, { onDelete: 'CASCADE' }) document: Document;
}
```



