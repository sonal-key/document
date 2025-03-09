// Authentication Module (auth.module.ts)
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/user/user.module';
import { JwtStrategy } from 'src/jwt.strategy';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({ secret: "mng", signOptions: { expiresIn: '1h' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}