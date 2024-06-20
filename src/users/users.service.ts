import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationException } from 'src/utils/ValidateExceptions';

@Injectable()
export class UsersService {
  constructor( 
    @InjectRepository(User) private userRepository: Repository<User>,
  ){}


  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { userId: id },relations:['posts']})
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { userId: id } });
      if (!user) throw new ValidationException('USER_NOT_FOUND')

      const editedUser= Object.assign(user, updateUserDto);
      if (!editedUser) throw new ValidationException('USER_NOT_MATCH')

      const data = await this.userRepository.save(editedUser)
      if (!data) throw new ValidationException('USER_NOT_FOUND')

      return { response: true, body: data };
    } catch (error) {
      throw new ValidationException(error)
    }
  }

  async softDelete(id: string){
    const del =await  this.userRepository.softDelete(id);
    console.log(del);
    
  }

  async restore(id: string) {
    await this.userRepository.restore(id);
    return this.userRepository.findOne({ where: { userId: id } });
  }
}
