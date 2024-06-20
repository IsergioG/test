import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guard-passport/auth.guards';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.postService.findOneById(id);
  }

  
  @Get('title/:id')
  findOneByTitle(@Param('id') id: string) {
    return this.postService.findOneByTitle(id);
  }

  
  @Get('user/:id')
  findOneByUserId(@Param('id') id: string) {
    return this.postService.findOneByUserId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.postService.softDelete(id);
  }

  @Put(':id')
  restore(@Param('id') id: string) {
    return this.postService.restore(id);
  }
}
