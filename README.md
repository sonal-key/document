# NestJS Document Management System

## 1. Project Setup & Basic Configuration (2-3 hours)

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
4. **Run database migrations**  
   ```sh
   npm run migration:run
   ```
5. **Start the server**  
   ```sh
   npm run start:dev
   ```

---

## 2. User & Authentication APIs (3-4 hours)

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
| GET    | `/users`          | List all users (Admin only) |

---

## 3. Document Management APIs (3-4 hours)

### Features:
- CRUD operations for documents (upload, update, delete, retrieve)
- Store document metadata in PostgreSQL
- Secure access control

### API Endpoints:
| Method | Endpoint            | Description                     |
|--------|--------------------|---------------------------------|
| POST   | `/documents/upload` | Upload a document              |
| GET    | `/documents/:id`    | Get document details by ID     |
| DELETE | `/documents/:id`    | Delete a document              |
| PUT    | `/documents/:id`    | Update document metadata       |

---

## 4. Ingestion Control & Communication with Python (4-5 hours)

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

## 5. Testing & API Documentation (3-4 hours)

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

---

## Conclusion
This NestJS-based document management system provides user authentication, document handling, ingestion tracking, and a well-tested API with clear documentation.

