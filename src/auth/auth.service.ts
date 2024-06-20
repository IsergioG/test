import { Injectable } from '@nestjs/common';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ValidationException } from 'src/utils/ValidateExceptions';
import { Login } from './dto/create-auth.dto';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor( 
    private jwtService:JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ){}

  async register(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto)
      if (!user) {
        throw new ValidationException('NOT_SAVED');
      }
      const password=encodePassword(user.password)

      const credentials={
        ...user,
        password
      }
      console.log(credentials);
      
      const saveUser = await this.userRepository.save(credentials)
      if (!saveUser) {
        throw new ValidationException('NOT_SAVED');
      }
      return {userId: saveUser.userId}
    } catch (error) {
      throw new ValidationException(error);
    }
  }

  async credentials(login:Login){
    const credentials=await this.userRepository.findOne({where:{email:login.mail}})
    const validatePassword = await comparePasswords(login.password, credentials.password);
    if(validatePassword){
      const payload = { username: credentials.email, sub: credentials.userId }
      return {
        access_token: this.jwtService.sign(payload),
      };
    }else{
      throw new ValidationException('WRONG_USER')
    }
  }


  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
