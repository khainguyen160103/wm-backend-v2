import { Body, Controller, Get, Delete, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { GetCurrentUserId } from 'src/common/decorators'
import { UserService } from 'src/account/user.service'
import { arrayToMap, getCreatedBy } from 'src/utils'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Comment } from './entities'
import { BaseServiceOptions } from 'libs/services/types/options.types'

@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService, private userService: UserService) {}

  @Post('find')
  @HttpCode(HttpStatus.OK)
  async getAllComments(@Body() params: { query: Comment; options: BaseServiceOptions }): Promise<Comment[]> {
    const comments = await this.service.getByCondition(params?.query, params?.options)

    const userIds = comments.map((comment) => comment.created_by_id)

    if (userIds.length) {
      const users = await this.userService.getByIds({ ids: userIds })

      const mapUser = arrayToMap(users, (user) => ({ key: user.id, value: user }))

      comments.forEach((comment) => {
        comment.created_by = mapUser[comment.created_by_id]
      })
    }

    return comments
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@GetCurrentUserId() userId: number, @Body() comment: CreateCommentDto): Promise<Comment> {
    let result = await this.service.create({ ...comment, created_by_id: userId })
    result = await this.service.getById(result.id)

    if (result) {
      result = await getCreatedBy(result, this.userService)
    }

    return result
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() comment: UpdateCommentDto): Promise<Comment> {
    let result = await this.service.update(comment.id, comment)
    result = await this.service.getById(result.id)

    if (result) {
      result = await getCreatedBy(result, this.userService)
    }

    return result
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string | number): Promise<any> {
    return this.service.delete(id)
  }
}
