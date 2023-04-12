import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { GetCurrentUserId } from 'src/common/decorators'
import { UserService } from 'src/user/user.service'
import { getCreatedBy } from 'src/utils'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Comment } from './entities'

@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService, private userService: UserService) {}

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
