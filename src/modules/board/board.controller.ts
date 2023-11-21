import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { BoardService } from './board.service'
import { CreateBoardDto, UpdateBoardDto } from './dto'

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateBoardDto) {
    return await this.boardService.create(dto as any)
  }

  @Get('/:board_id')
  @HttpCode(HttpStatus.FOUND)
  async get(@Param('board_id') id: number) {
    return await this.boardService.getByCondition({ id })
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  async getAll() {
    return this.boardService.getByCondition()
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: UpdateBoardDto) {
    return await this.boardService.update(dto.id, dto as any)
  }

  @Delete('/:board_id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('board_id') id: number) {
    return await this.boardService.delete(id)
  }


}
