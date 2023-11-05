import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common'
import { ColumnService } from './column.service'
import { CreateColumnDto, UpdateColumnDto } from './dto'
import { randomColor } from 'src/utils'

@Controller('column')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Get()
  async getAll() {
    return await this.columnService.getByCondition()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateColumnDto) {
    const { name, color } = dto

    const columns = await this.getAll()

    return this.columnService.create({
      name,
      color: color || randomColor(),
      order: columns.length,
    })
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() dto: UpdateColumnDto) {
    const { name, column_id, color } = dto
    return this.columnService.update(column_id, { name, color })
  }
}
