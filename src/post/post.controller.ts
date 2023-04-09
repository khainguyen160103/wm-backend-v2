import { Controller, Get, Put, Post, Body, Delete, Param } from '@nestjs/common'
import { PostService } from './post.service'
import * as PostEntity from './entities'
import { GetCurrentUserId } from 'src/common/decorators'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Controller('post')
export class PostController {
  constructor(public service: PostService) {}

  @Get()
  getAllPosts(query: PostEntity.Post): Promise<PostEntity.Post[]> {
    return this.service.test(query)
  }

  @Post()
  create(@GetCurrentUserId() userId: number, @Body() post: CreatePostDto): Promise<PostEntity.Post> {
    return this.service.create({ ...post, created_by_id: userId })
  }

  @Put()
  update(@Body() post: UpdatePostDto): Promise<PostEntity.Post> {
    return this.service.update(post.id, post)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<any> {
    return this.service.delete(id)
  }
}
