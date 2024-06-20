import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './guard-passport/jwt.strategy';
dotenv.config();
@Module({
  imports:[TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
    secret: process.env.JWT_SECRET, 
    signOptions: { expiresIn: '1m' }, 
  }),],
  controllers: [AuthController],
  providers: [AuthService,
    JwtStrategy
  ],
})
export class AuthModule {}
