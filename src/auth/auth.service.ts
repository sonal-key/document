import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService,   @InjectRepository(User)
      private userRepository: Repository<User>,) {}

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
  async register(registerDto: any) {
    const { username, email, password, role } = registerDto;
  
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create the user
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'user'
    });
  
    await this.userRepository.save(user);
  
    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  }
  
}