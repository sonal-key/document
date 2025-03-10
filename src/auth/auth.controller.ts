import { 
  Body, 
  Controller, 
  Post, 
  Res, 
  UseGuards 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from "../user/jwt-auth.guard"
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  @ApiOperation({ summary: 'User Registration' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User Logout' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  async logout(@Res() res: Response) {
    res.clearCookie('jwt'); 
    return res.status(200).json(await this.authService.logout());
  }
}
