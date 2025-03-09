import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body);
  }
  @Post('register')
async register(@Body() registerDto: any) {
  return this.authService.register(registerDto);
}
@Post('logout')
@UseGuards(JwtAuthGuard)

  async logout(@Res() res: Response) {
    // If using cookies, clear JWT cookie
    res.clearCookie('jwt'); 

    // Return success message
    return res.status(200).json(await this.authService.logout());
  }
}