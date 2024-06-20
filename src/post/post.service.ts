import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ValidationException } from 'src/utils/ValidateExceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>
  ){

  }
  async create(createPostDto: CreatePostDto) {
    try {
      const post = this.postRepository.create(createPostDto)
      if (!post) {
        throw new ValidationException('NOT_SAVED');
      }
      
      const savePost = await this.postRepository.save(post)
      if (!savePost) {
        throw new ValidationException('NOT_SAVED');
      }
      return { response: true, body: savePost}
    } catch (error) {
      throw new ValidationException(error);
    }
  }

  findAll() {
    return this.postRepository.find();
  }

  findOneById(id: string) {
    return this.postRepository.findOne({where:{postId:id}});
  }

  findOneByTitle(title: string) {
    return this.postRepository.findOne({where:{title:title}});
  }

  findOneByUserId(user: string) {
    const data= this.postRepository
    .createQueryBuilder('post')
    .where('post.user =: userId',{userId:user})
    .getOne()
    return data
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {

      const user = await this.userRepository.findOne({ where: { userId: id } });
      if (!user) throw new ValidationException('USER_DONT_HAVE_POST')

      const post = await this.postRepository.findOne({ where: { postId: id } });
      if (!post) throw new ValidationException('POST_NOT_FOUND')

      const editedPost= Object.assign(post, updatePostDto);
      if (!editedPost) throw new ValidationException('POST_NOT_MATCH')

      const data = await this.postRepository.save(editedPost)
      if (!data) throw new ValidationException('POST_NOT_FOUND')

      return { response: true, body: data };
    } catch (error) {
      throw new ValidationException(error)
    }
  }

  async softDelete(id: string){
    const del =await  this.postRepository.softDelete(id);
    return{response:true, body:del}
  }

  async restore(id: string) {
    await this.postRepository.restore(id);
    const restore= this.postRepository.findOne({ where: { postId: id } });
    return{response:true, body:restore}
  }
}
