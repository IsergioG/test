import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { LocalAuthGuard } from './guard-passport/local.guard';
import { Login } from './dto/create-auth.dto';
import { JwtAuthGuard } from './guard-passport/auth.guards';
import { ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registro de usuario' })
  @ApiBody({ type: CreateUserDto, description: 'Datos requeridos para el Registro de usuario.'})
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
  @ApiResponse({ status: 400, description: 'Creación erronea' })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Login de usuario en el aplicativo. Genera token de Sesión. (USER)' })
  @ApiBody({ type: Login, description: 'Datos requeridos para Login de usuario.'})
  @ApiResponse({ status: 201, description: 'Usuario ingresado creado correctamente' })
  @ApiResponse({ status: 400, description: 'Contraseña o usuario sin coincidencia' })
  @Post('login')
  login(@Body() login:Login) {
    return this.authService.credentials(login);
  }

  @ApiOperation({ summary: 'Cierre de sesion de usuario' })
  @ApiParam({
    name:"id",
    description:"Id de usuario",
    type:String,
    required:true
  })
  @Post(":id")
  closeSession(@Param("id") id:string) {
    return this.authService.closeSession(id);
  }

}
