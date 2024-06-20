import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard-passport/auth.guards';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @ApiOperation({ summary: 'Obtiene un registro especifico de un usuario por ID' })
  @ApiParam({
    name:"id",
    description:"Id de usuario",
    type:String,
    required:true
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Busca coincidencia y actualiza el usuario' })
  @ApiBody({ type: UpdateUserDto, description: 'Datos requeridos para actualizar el Usuario.'})
  @ApiParam({
    name:"id",
    description:"Id de Usuario",
    type:String,
    required:true
  }) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Eliminación suave de registro, sin modificación de tablas' })
  @ApiParam({
    name:"id",
    description:"Id de usuario",
    type:String,
    required:true
  }) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.softDelete(id);
  }

  @ApiOperation({ summary: 'Recuperación de información despues de eliminada' })
  @ApiParam({
    name:"id",
    description:"Id de usuario",
    type:String,
    required:true
  }) 
  @Put(':id')
  restore(@Param('id') id: string) {
    return this.usersService.restore(id);
  }
}
