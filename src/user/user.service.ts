import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  findByEmail(email: string) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }
  // 2.2 Get User By ID
  async getUserById(id: any) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  // 2.3 Update User Role
  async updateUserRole(id: any, role: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    user.role = role;
    await this.userRepository.save(user);
    
    return { message: 'User role updated successfully' };
  }

  // 2.4 Delete User
  async deleteUser(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');

    return { message: 'User deleted successfully' };
  }
}
