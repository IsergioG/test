import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { LocalAuthGuard } from './guard-passport/local.guard';
import { Login } from './dto/create-auth.dto';
import { JwtAuthGuard } from './guard-passport/auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() login:Login) {
    return this.authService.credentials(login);
  }


  @Post(":id")
  closeSession(@Param("id") id:string) {
    return this.authService.closeSession(id);
  }

}
