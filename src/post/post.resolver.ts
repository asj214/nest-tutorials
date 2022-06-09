import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user.decorator';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostDto])
  async postList() {
    return await this.postService.findAll();
  }

  @Query(() => PostDto)
  async postDetail(@Args('id') id: number) {
    return await this.postService.findOne(id);
  }
}
