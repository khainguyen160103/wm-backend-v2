import { Controller, Get, Put, Post, Body, Delete, Param } from '@nestjs/common'
import { PostService } from './post.service'
import * as PostEntity from './entities'
import { GetCurrentUserId } from 'src/common/decorators'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { getCreatedBy } from 'src/utils/user'
import { UserService } from 'src/user/user.service'
import { arrayToMap } from 'src/utils'

@Controller('post')
export class PostController {
  constructor(private service: PostService, private userService: UserService) {}

  @Get()
  async getAllPosts(query: PostEntity.Post): Promise<PostEntity.Post[]> {
    const posts = await this.service.getByCondition(query)

    const createdByIds = [...new Set(posts.map((post) => post.created_by_id))]
    const users = await this.userService.getByIds({ ids: createdByIds })
    const mapUser = arrayToMap(users, (user) => ({ key: user.id, value: user }))
    posts.forEach((post) => {
      if (mapUser[post.created_by_id]) post.created_by = mapUser[post.created_by_id]
    })

    return posts
  }

  @Get('/:id')
  async getById(@Param('id') id: string | number): Promise<PostEntity.Post> {
    let result = await this.service.getById(id, { relations: ['medias', 'category', 'hastags'] })

    if (result) {
      result = await getCreatedBy(result, this.userService)
    }
    return result
  }

  @Post()
  async create(@GetCurrentUserId() userId: number, @Body() post: CreatePostDto): Promise<PostEntity.Post> {
    let result = await this.service.create({ ...post, created_by_id: userId })
    result = await this.getById(result.id)

    if (result) {
      result = await getCreatedBy(result, this.userService)
    }

    return result
  }

  @Put()
  async update(@Body() post: UpdatePostDto): Promise<PostEntity.Post> {
    let result = await this.service.update(post.id, post)
    result = await this.getById(result.id)

    if (result) {
      result = await getCreatedBy(result, this.userService)
    }

    return result
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string | number): Promise<any> {
    return this.service.delete(id)
  }
}
