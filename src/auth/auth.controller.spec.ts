import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from "../user/jwt-auth.guard"
import { CanActivate } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { Response } from 'express';
import { UsersService } from '../user/user.service';
import { Document } from '../documents/documents.entity';
import { User } from '../user/user.entity';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn().mockImplementation((dto: LoginDto) =>
      Promise.resolve({ accessToken: 'mockJwtToken' }),
    ),
    register: jest.fn().mockImplementation((dto: RegisterDto) =>
      Promise.resolve({ message: 'User registered successfully' }),
    ),
    logout: jest.fn().mockResolvedValue({ message: 'User logged out successfully' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) } as CanActivate)
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return an access token on successful login', async () => {
      const loginDto: LoginDto = { email: 'test@example.com', password: 'password' };

      expect(await authController.login(loginDto)).toEqual({
        accessToken: 'mockJwtToken',
      });

      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('register', () => {
    it('should register a user and return a success message', async () => {
      const registerDto: RegisterDto = {
        name: 'testuser',
        email: 'test@example.com',
        password: 'password',
      };

      expect(await authController.register(registerDto)).toEqual({
        message: 'User registered successfully',
      });

      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('logout', () => {
    it('should clear JWT cookie and return a success message', async () => {
      const mockRes = {
        clearCookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await authController.logout(mockRes);

      expect(mockRes.clearCookie).toHaveBeenCalledWith('jwt');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User logged out successfully' });
      expect(mockAuthService.logout).toHaveBeenCalled();
    });
  });
});
