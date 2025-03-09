import { Test, TestingModule } from '@nestjs/testing';
import { MockPythonController } from './mock-python.controller';
import { MockPythonService } from './mock-python.service';

describe('MockPythonController', () => {
  let mockPythonController: MockPythonController;
  let mockPythonService: MockPythonService;

  const mockService = {
    triggerIngestion: jest.fn().mockImplementation((documentId: string) =>
      Promise.resolve({ message: `Ingestion triggered for ${documentId}` }),
    ),
    getIngestionStatus: jest.fn().mockImplementation((id: string) =>
      Promise.resolve({ id, status: 'processing' }),
    ),
    getEmbeddings: jest.fn().mockImplementation((documentId: string) =>
      Promise.resolve({ documentId, embeddings: [0.1, 0.2, 0.3] }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockPythonController],
      providers: [{ provide: MockPythonService, useValue: mockService }],
    }).compile();

    mockPythonController = module.get<MockPythonController>(MockPythonController);
    mockPythonService = module.get<MockPythonService>(MockPythonService);
  });

  describe('triggerIngestion', () => {
    it('should trigger ingestion for a document', async () => {
      const body = { documentId: 'doc123' };

      expect(await mockPythonController.triggerIngestion(body)).toEqual({
        message: `Ingestion triggered for doc123`,
      });

      expect(mockPythonService.triggerIngestion).toHaveBeenCalledWith('doc123');
    });
  });

  describe('getIngestionStatus', () => {
    it('should return the ingestion status', async () => {
      const id = 'ingest123';

      expect(await mockPythonController.getIngestionStatus(id)).toEqual({
        id: 'ingest123',
        status: 'processing',
      });

      expect(mockPythonService.getIngestionStatus).toHaveBeenCalledWith(id);
    });
  });

  describe('getEmbeddings', () => {
    it('should return embeddings for a document', async () => {
      const documentId = 'doc123';

      expect(await mockPythonController.getEmbeddings(documentId)).toEqual({
        documentId: 'doc123',
        embeddings: [0.1, 0.2, 0.3],
      });

      expect(mockPythonService.getEmbeddings).toHaveBeenCalledWith(documentId);
    });
  });
});
