import { Controller,Headers, Get, Post, Body, Param, UseGuards, Patch, Delete, Put, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './user.service';
import { Roles } from './roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
interface AuthenticatedRequest extends Request {
  user?: any;
}
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

  // 2.4 Delete User (Only Admins can delete users)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string,  @Headers('x-userid') adminUserId: string, 
) {
    return this.usersService.deleteUser(id,adminUserId);
  }
}