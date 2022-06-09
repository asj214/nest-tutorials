import { Injectable, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async create(userId: number, createPostDto: CreatePostDto) {
    const post = new PostEntity({ ...createPostDto });
    const newPost = await this.postRepository.save(post);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['posts']
    });

    user.posts.push(post);

    await this.userRepository.save(user);

    return newPost;
  }

  async findAll() {
    const resp = await this.postRepository.findAndCount({
      relations: ['user'],
      // loadEagerRelations: true,
      order: {
        ['id']: 'DESC'
      }
    });

    return { count: resp[1], results: resp[0] };
  }

  async findOne(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({
      relations: ['user'],
      where: { id: id } 
    });
    if (!post) throw new NotFoundException();

    return new PostEntity(post);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({
      relations: ['user'],
      where: { id: id } 
    });

    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
