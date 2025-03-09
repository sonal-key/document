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
        const user = await this.userRepository.findOne({ 
          where: { email }, 
          select: ['id', 'email', 'role', 'password']  // ✅ Ensure role and id are fetched
        });
      
        console.log('🔹 Found User in DB:', user); // Debugging log
      
        if (user && user.password === pass) {
          const { password, ...result } = user; // Exclude password from response
          return result;
        }
        return null;
      }
      
      
  
      async login(user: any) {
        console.log('🔹 Logging in user:', user); // Debug log
      
        const payload = { 
          email: user.email, 
          userId: user.id,   // ✅ Ensure we use `user.id`
          role: user.role    // ✅ Ensure we use `user.role`
        };
      
        console.log('🔹 JWT Payload Before Signing:', payload); // Debugging log
      
        const token = this.jwtService.sign(payload);
        console.log('🔹 Generated Token:', token); // Debug log to check
      
        return { access_token: token };
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