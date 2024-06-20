import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ValidationException } from 'src/utils/ValidateExceptions';
dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, 
    });
  }

  async validate(payload) {
    const validate=await this.userRepository.findOne({where:{userId:payload.sub}})
    if(validate.sesion==true){
    return { userId: payload.sub, username: payload.username };
    }else{
      throw new ValidationException('REFRESH_TOKEN_OR_LOGGIN');
    }
  }
}