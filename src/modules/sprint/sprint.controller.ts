import { Controller, Post, Put, Get, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common'
import { SprintService } from './sprint.service'
import { CreateSprintDto } from './dto/create-sprint.dto'
import { UpdateSprintDto } from './dto/update-sprint.dto'

@Controller('sprint')
export class SprintController {
  constructor(private sprintService: SprintService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.FOUND)
  async get(@Param('id') id: number) {
    return await this.sprintService.getByCondition({ id })
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  async getAll() {
    return await this.sprintService.getByCondition()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateSprintDto) {
    return this.sprintService.create(dto as any)
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: UpdateSprintDto) {
    return await this.sprintService.update(dto.id, dto)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number) {
    return await this.sprintService.delete(id)
  }
}
