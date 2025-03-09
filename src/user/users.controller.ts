import { Controller, Get, Post, Body, Param, UseGuards, Patch, Delete } from '@nestjs/common';
import { UsersService } from './user.service';
import { Roles } from './roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  // 2.3 Update User Role (Only Admins can update roles)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/role')
  async updateUserRole(@Param('id') id: string, @Body() body: { role: string }) {
    return this.usersService.updateUserRole(id, body.role);
  }

  // 2.4 Delete User (Only Admins can delete users)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}