import { Controller, Get, Put, Post, Body, Delete, Param, HttpStatus, HttpCode } from '@nestjs/common'
import { PostService } from './post.service'
import * as PostEntity from './entities'
import { GetCurrentUserId } from 'src/common/decorators'
import { getCreatedBy } from 'src/utils/user'
import { UserService } from 'src/user/user.service'
import { arrayToMap } from 'src/utils'
import { SavePostDto, CreatePostDto, UpdatePostDto } from './dto'
import { PostUserService } from './post_user.service'
import { PostUser } from './entities'
import { In } from 'typeorm'
import { BaseServiceOptions } from 'libs/services/types/options.types'

@Controller('post')
export class PostController {
  constructor(
    private service: PostService,
    private userService: UserService,
    private postUserService: PostUserService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPosts(
    @Body() params: { query: PostEntity.Post; options: BaseServiceOptions },
    @GetCurrentUserId() userId: number
  ): Promise<PostEntity.Post[]> {
    const posts = await this.service.getByCondition(params?.query, params?.options)

    const createdByIds = [...new Set(posts.map((post) => post.created_by_id))]
    const postIds = posts.map((post) => post.id)
    const [users, postUsers] = await Promise.all([
      this.userService.getByIds({ ids: createdByIds }),
      this.postUserService.getByCondition(
        { post_id: In([...postIds]) },
        { select: ['post_id', 'user_id', 'is_like', 'is_save'] }
      ),
    ])

    const mapUser = arrayToMap(users, (user) => ({ key: user.id, value: user }))

    posts.forEach((post: any) => {
      if (mapUser[post.created_by_id]) post.created_by = mapUser[post.created_by_id]

      const likeCounts = postUsers.filter((pu) => pu.post_id === post.id && pu.is_like)
      post.like_count = likeCounts.length
      post.post_user = postUsers.find((pu) => pu.user_id === userId)
    })

    return posts
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string | number): Promise<PostEntity.Post> {
    let result = await this.service.getById(id, { relations: ['medias', 'category', 'hastags', 'comments'] })
    let postUsers = []
    if (result) {
      ;[result, postUsers] = await Promise.all([
        getCreatedBy(result, this.userService),
        this.postUserService.getByCondition(
          { post_id: result.id },
          { select: ['id', 'post_id', 'user_id', 'is_like', 'is_save'] }
        ),
      ])
      result.post_users = postUsers
    }

    if (result.comments) {
      const userIds = result.comments.map((comment) => comment.created_by_id)

      if (userIds.length) {
        const users = await this.userService.getByIds({ ids: userIds })

        const mapUser = arrayToMap(users, (user) => ({ key: user.id, value: user }))

        result.comments.forEach((comment) => {
          comment.created_by = mapUser[comment.created_by_id]
        })
      }
    }

    return result
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@GetCurrentUserId() userId: number, @Body() post: CreatePostDto): Promise<PostEntity.Post> {
    let result = await this.service.create({ ...post, created_by_id: userId })
    result = await this.getById(result.id)
    let postUsers = []
    if (result) {
      ;[result, postUsers] = await Promise.all([
        getCreatedBy(result, this.userService),
        this.postUserService.getByCondition(
          { post_id: result.id },
          { select: ['id', 'post_id', 'user_id', 'is_like', 'is_save'] }
        ),
      ])
      result.post_users = postUsers
    }

    return result
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() post: UpdatePostDto): Promise<PostEntity.Post> {
    let result = await this.service.update(post.id, post)
    result = await this.getById(result.id)
    let postUsers = []
    if (result) {
      ;[result, postUsers] = await Promise.all([
        getCreatedBy(result, this.userService),
        this.postUserService.getByCondition(
          { post_id: result.id },
          { select: ['id', 'post_id', 'user_id', 'is_like', 'is_save'] }
        ),
      ])
      result.post_users = postUsers
    }

    return result
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string | number): Promise<any> {
    return this.service.delete(id)
  }

  @Post('save')
  @HttpCode(HttpStatus.OK)
  async save(@GetCurrentUserId() userId: number, @Body() params: SavePostDto): Promise<PostUser> {
    const payload = {
      user_id: userId,
      post_id: params.post_id,
    }
    return this.service.save(payload)
  }

  @Post('like')
  @HttpCode(HttpStatus.OK)
  async like(@GetCurrentUserId() userId: number, @Body() params: SavePostDto): Promise<PostUser> {
    const payload = {
      user_id: userId,
      post_id: params.post_id,
    }
    return this.service.like(payload)
  }
}
