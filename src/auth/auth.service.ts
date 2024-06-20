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
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class AuthService {
  constructor( 
    private jwtService:JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailService:MailService
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
        password,
        sesion:true
      }
      await this.mailService.email(credentials.fullName,credentials.email,)
      
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
    try{
    const credentials=await this.userRepository.findOne({where:{email:login.mail}})
    if(!credentials){throw new ValidationException('WRONG_USER')}
    const validatePassword = await comparePasswords(login.password, credentials.password);
    const data={
      ...credentials,
      sesion:true
    }
    const saveUser = await this.userRepository.save(data)
    if (!saveUser) {
      throw new ValidationException('NOT_SAVED');
    }
    if(validatePassword){
      const payload = { username: credentials.email, sub: credentials.userId }
      const access_token = this.jwtService.sign(payload)
      return {
        access_token:access_token
        
      };
    }else{
      throw new ValidationException('WRONG_PASS')
    }
  }catch(error){
      throw new ValidationException(JSON.stringify(error.message))
    }
  }


  async closeSession(id:string) {
    const credentials=await this.userRepository.findOne({where:{userId:id}})
    const data={
      ...credentials,
      sesion:false
    }
    return await this.userRepository.save(data)
  }

}
