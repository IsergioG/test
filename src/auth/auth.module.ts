import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './guard-passport/jwt.strategy';
import { MailService } from 'src/mail/mail.service';
dotenv.config();
@Module({
  imports:[TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
    secret: process.env.JWT_SECRET, 
    signOptions: { expiresIn: '1h' }, 
  }),],
  controllers: [AuthController],
  providers: [AuthService,
    JwtStrategy,MailService
  ],
})
export class AuthModule {}
