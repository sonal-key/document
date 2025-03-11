import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
  async updateUserRole(userId: any, targetUserId: any, newRole: string) {
    // Fetch the requesting user from the database
    const requestingUser = await this.userRepository.findOne({ where: { id: userId } });
    if (!requestingUser) {
        throw new NotFoundException('you are not found');
    }

    // Check if the requesting user is an admin
    if (requestingUser.role !== 'admin') {
        throw new ForbiddenException('Only admins can change user roles');
    }

    // Fetch the target user whose role needs to be updated
    const targetUser = await this.userRepository.findOne({ where: { id: targetUserId } });
    if (!targetUser) {
        throw new NotFoundException('Target user not found');
    }

    // Update the role and save changes
    targetUser.role = newRole;
    await this.userRepository.save(targetUser);
    
    return { message: 'User role updated successfully' };
}


  // 2.4 Delete User
  async deleteUser(id: string,adminUserId:any) {
    const requestingUser = await this.userRepository.findOne({ where: { id: adminUserId } });
    if (!requestingUser) {
        throw new NotFoundException('You are not found');
    }

    // Check if the requesting user is an admin
    if (requestingUser.role !== 'admin') {
        throw new ForbiddenException('Only admins can delete');
    }
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');

    return { message: 'User deleted successfully' };
  }
}
