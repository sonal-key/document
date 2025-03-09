import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { AuthGuard } from '@nestjs/passport';
import { CanActivate } from '@nestjs/common';

describe('DocumentController', () => {
  let documentController: DocumentController;
  let documentService: DocumentService;

  const mockDocumentService = {
    uploadDocument: jest.fn().mockImplementation((user, fileName, fileType, fileSize) =>
      Promise.resolve({ id: '1', fileName, fileType, fileSize, status: 'uploaded', user }),
    ),
    getAllDocuments: jest.fn().mockResolvedValue([{ id: '1', fileName: 'test.pdf' }]),
    getDocumentById: jest.fn().mockImplementation((id) =>
      Promise.resolve({ id, fileName: 'test.pdf', status: 'uploaded' }),
    ),
    updateDocumentStatus: jest.fn().mockImplementation((id, status) =>
      Promise.resolve({ id, status }),
    ),
    deleteDocument: jest.fn().mockImplementation((id) =>
      Promise.resolve({ message: 'Document deleted successfully', id }),
    ),
    getDocumentsByUser: jest.fn().mockImplementation((userId) =>
      Promise.resolve([{ id: '1', userId, fileName: 'test.pdf' }]),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [{ provide: DocumentService, useValue: mockDocumentService }],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: jest.fn(() => true) } as CanActivate)
      .compile();

    documentController = module.get<DocumentController>(DocumentController);
    documentService = module.get<DocumentService>(DocumentService);
  });

  describe('uploadDocument', () => {
    it('should upload a document and return it', async () => {
      const mockUser = { id: '123', username: 'testuser' };
      const req = { user: mockUser };

      const result = await documentController.uploadDocument(req);

      expect(result).toMatchObject({
        id: expect.any(String),
        fileName: expect.stringContaining('mock_file_'),
        fileType: 'application/pdf',
        fileSize: 12345,
        status: 'uploaded',
        user: mockUser,
      });

      expect(mockDocumentService.uploadDocument).toHaveBeenCalledWith(
        mockUser,
        expect.stringContaining('mock_file_'),
        'application/pdf',
        12345,
      );
    });
  });

  describe('getAllDocuments', () => {
    it('should return an array of documents', async () => {
      expect(await documentController.getAllDocuments()).toEqual([{ id: '1', fileName: 'test.pdf' }]);
      expect(mockDocumentService.getAllDocuments).toHaveBeenCalled();
    });
  });

  describe('getDocumentById', () => {
    it('should return a document by ID', async () => {
      const id = '1';
      expect(await documentController.getDocumentById(id)).toEqual({ id, fileName: 'test.pdf', status: 'uploaded' });
      expect(mockDocumentService.getDocumentById).toHaveBeenCalledWith(id);
    });
  });

  describe('updateDocumentStatus', () => {
    it('should update document status', async () => {
      const id = '1';
      const status = 'processed';

      expect(await documentController.updateDocumentStatus(id, { status })).toEqual({ id, status });
      expect(mockDocumentService.updateDocumentStatus).toHaveBeenCalledWith(id, status);
    });
  });

  describe('deleteDocument', () => {
    it('should delete a document', async () => {
      const id = '1';

      expect(await documentController.deleteDocument(id)).toEqual({
        message: 'Document deleted successfully',
        id,
      });

      expect(mockDocumentService.deleteDocument).toHaveBeenCalledWith(id);
    });
  });

  describe('getDocumentsByUser', () => {
    it('should return documents by user ID', async () => {
      const userId = 123;
      expect(await documentController.getDocumentsByUser(userId)).toEqual([{ id: '1', userId, fileName: 'test.pdf' }]);
      expect(mockDocumentService.getDocumentsByUser).toHaveBeenCalledWith(userId);
    });
  });
});
