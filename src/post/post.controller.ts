import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards,Request } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guard-passport/auth.guards';
import { ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}
  
  @ApiOperation({ summary: 'Genera publicaciones con relación a un usuario' })
  @ApiBody({ type: CreatePostDto, description: 'Datos requeridos para create de post.'})
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Obtiene todos los registros de publicaciones' })
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene un registro especifico de un post por ID' })
  @ApiParam({
    name:"id",
    description:"Id de post",
    type:String,
    required:true
  })
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.postService.findOneById(id);
  }

  @ApiOperation({ summary: 'Obtiene post por coincidencia de titulo' })
  @ApiParam({
    name:"titleName",
    description:"Nombre de titulo",
    type:String,
    required:true
  })
  @Get('title/:titleName')
  findOneByTitle(@Param('titleName') titleName: string) {
    return this.postService.findOneByTitle(titleName.toLowerCase());
  }

  @ApiOperation({ summary: 'Obtiene post por coincidencia de Id de Usuario' })
  @ApiParam({
    name:"id",
    description:"Id de usuario",
    type:String,
    required:true
  }) 
  @Get('user/:id')
  findOneByUserId(@Param('id') id: string) {
    return this.postService.findOneByUserId(id);
  }

  @ApiOperation({ summary: 'Busca coincidencia y actualiza el post' })
  @ApiBody({ type: UpdatePostDto, description: 'Datos requeridos para actualizar de post.'})
  @ApiParam({
    name:"id",
    description:"Id de post",
    type:String,
    required:true
  }) 
  @Patch(':id')
  update(@Request() req,@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(req.user.userId,id, updatePostDto);
  }

  @ApiOperation({ summary: 'Eliminación suave de registro, sin modificación de tablas' })
  @ApiParam({
    name:"id",
    description:"Id de post",
    type:String,
    required:true
  }) 
  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.postService.softDelete(id);
  }

  @ApiOperation({ summary: 'Recuperación de información despues de eliminada' })
  @ApiParam({
    name:"id",
    description:"Id de post",
    type:String,
    required:true
  }) 
  @Put(':id')
  restore(@Param('id') id: string) {
    return this.postService.restore(id);
  }
}
