import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    console.log('🔹 Extracted User:', user);  // Debugging log

    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
