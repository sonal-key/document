# NestJS Document Management System

## 1. Project Setup & Basic Configuration 

### Technologies Used:
- **NestJS** (Node.js framework)
- **TypeScript** (for type safety)
- **PostgreSQL** (database)
- **TypeORM** (ORM for database management)
- **JWT Authentication** (for secure access control)

### Setup Instructions:
1. **Clone the repository**  
   ```sh
   git clone <repository-url>
   cd nestjs-document-mgmt
   ```
2. **Install dependencies**  
   ```sh
   npm install
   ```
3. **Configure environment variables**  
   Create a `.env` file and configure database connection, JWT secrets, etc.

4. **Start the server**  
   ```sh
   npm run start:dev
   ```

---

## 2. User & Authentication APIs 

### Features:
- User registration, login, and logout
- Role-based access control (Admin, Editor, Viewer)
- Password hashing & JWT token generation

### API Endpoints:
| Method | Endpoint           | Description                  |
|--------|-------------------|------------------------------|
| POST   | `/auth/register`  | Register a new user         |
| POST   | `/auth/login`     | Login and get JWT token     |
| POST   | `/auth/logout`    | Logout user                 |
| GET    | `/users`          | List all users              |
| GET    | `/users/:id`      | Get user by ID (JWT Protected) |
| PUT    | `/users/update-role` | Update user role (Admin only) |
| DELETE | `/users/:id`      | Delete a user (Admin only)  |

---

## 3. Document Management APIs 

### Features:
- CRUD operations for documents (upload, update, delete, retrieve)
- Store document metadata in PostgreSQL
- Secure access control

### API Endpoints:
| Method | Endpoint            | Description                     |
|--------|--------------------|---------------------------------|
| POST   | `/documents/upload` | Upload a document              |
| GET    | `/documents`        | Get all documents              |
| GET    | `/documents/:id`    | Get document details by ID     |
| PATCH  | `/documents/:id/status` | Update document status  |
| DELETE | `/documents/:id`    | Delete a document              |
| GET    | `/documents/user/:userId` | Get documents by user ID  |

---

## 4. Ingestion Control & Communication with Python Mock

### Features:
- Ingestion API to trigger processing (calls Python API or mock service)
- Track ingestion status in the database
- Handle errors and retries if ingestion fails

### API Endpoints:
| Method | Endpoint              | Description                           |
|--------|----------------------|--------------------------------------|
| POST   | `/ingestions/trigger` | Trigger document ingestion          |
| GET    | `/ingestions/:id`     | Get ingestion status                 |

---

## 5. Basic Entity Definitions


### **User Table**
- `id` (Primary Key, Auto-increment)
- `email` (Unique, String)
- `password` (String)
- `role` (String, Default: "Viewer")
- `createdAt` (Timestamp, Auto-generated)

### **Document Table**
- `id` (Primary Key, Auto-increment)
- `title` (String)
- `filePath` (String)
- `status` (String, Default: "Pending")  // Pending, Approved, Rejected
- `ownerId` (Foreign Key → User)
- `createdAt` (Timestamp, Auto-generated)

### **Ingestion Table**
- `id` (Primary Key, Auto-increment)
- `documentId` (Foreign Key → Document)
- `status` (String, Default: "Processing")  // Processing, Completed, Failed
- `createdAt` (Timestamp, Auto-generated)

## 6. Testing & API Documentation

### Features:
- Unit tests for key APIs using Jest
- API documentation using Swagger/OpenAPI
- Basic load testing (optional)

### Running Tests:
```sh
npm run test
```

### API Documentation:
Swagger UI available at:
```
http://localhost:3000/api
```

