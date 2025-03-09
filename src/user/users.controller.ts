import { Controller, Headers, Get, Post, Body, Param, UseGuards, Patch, Delete, Put, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiHeader } from '@nestjs/swagger';

@ApiTags('Users') // Swagger grouping
@ApiBearerAuth() // Adds Authorization header in Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update user role (Admin only)' })
  @ApiHeader({ name: 'x-userid', required: true, description: 'Admin User ID' })
  @UseGuards(JwtAuthGuard)
  @Put('update-role')
  async updateUserRole(
    @Headers('x-userid') adminUserId: string, 
    @Body('targetUserId') targetUserId: string, 
    @Body('newRole') newRole: string
  ) {
    if (!adminUserId) throw new UnauthorizedException('User ID missing in header');
    return this.usersService.updateUserRole(adminUserId, targetUserId, newRole);
  }

  @ApiOperation({ summary: 'Delete a user (Admin only)' })
  @ApiHeader({ name: 'x-userid', required: true, description: 'Admin User ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID to delete' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,  
    @Headers('x-userid') adminUserId: string
  ) {
    return this.usersService.deleteUser(id, adminUserId);
  }
}
