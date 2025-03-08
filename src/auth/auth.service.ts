import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user:any = await this.usersService.findByEmail(email);
    if (!user) return null;
  
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) return null;
  
    const { password, ...result } = user;
    return result;
  }
  

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}