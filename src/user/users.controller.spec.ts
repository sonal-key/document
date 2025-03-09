import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue([{ id: '1', email: 'test@example.com', role: 'user' }]),
    getUserById: jest.fn().mockImplementation((id) =>
      Promise.resolve({ id, email: 'test@example.com', role: 'user' }),
    ),
    updateUserRole: jest.fn().mockImplementation((adminUserId, targetUserId, newRole) =>
      Promise.resolve({ message: 'User role updated successfully', targetUserId, newRole }),
    ),
    deleteUser: jest.fn().mockImplementation((id, adminUserId) =>
      Promise.resolve({ message: 'User deleted successfully', id }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await usersController.findAll()).toEqual([{ id: '1', email: 'test@example.com', role: 'user' }]);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const id = '1';
      expect(await usersController.getUserById(id)).toEqual({ id, email: 'test@example.com', role: 'user' });
      expect(mockUsersService.getUserById).toHaveBeenCalledWith(id);
    });
  });

  describe('updateUserRole', () => {
    it('should update the user role when adminUserId is provided', async () => {
      const adminUserId = 'admin123';
      const targetUserId = 'user123';
      const newRole = 'admin';

      expect(await usersController.updateUserRole(adminUserId, targetUserId, newRole)).toEqual({
        message: 'User role updated successfully',
        targetUserId,
        newRole,
      });

      expect(mockUsersService.updateUserRole).toHaveBeenCalledWith(adminUserId, targetUserId, newRole);
    });

    it('should throw UnauthorizedException if adminUserId is missing', async () => {
      await expect(usersController.updateUserRole('', 'user123', 'admin')).rejects.toThrow(
        new UnauthorizedException('User ID missing in header'),
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user if adminUserId is provided', async () => {
      const id = '1';
      const adminUserId = 'admin123';

      expect(await usersController.deleteUser(id, adminUserId)).toEqual({
        message: 'User deleted successfully',
        id,
      });

      expect(mockUsersService.deleteUser).toHaveBeenCalledWith(id, adminUserId);
    });
  });
});
