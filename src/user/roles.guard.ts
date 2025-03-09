import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    console.log('🔹 Headers:', request.headers.authorization);
    console.log('🔹 Decoded JWT User:', request.user); 

    if (!request.user) {
      throw new ForbiddenException('No user found in request');
    }

    if (!request.user.role) {
      throw new ForbiddenException('User role is undefined');
    }

    if (!requiredRoles.includes(request.user.role)) {
      throw new ForbiddenException(`User with role "${request.user.role}" is not allowed to access this resource`);
    }

    return true;
  }
}


