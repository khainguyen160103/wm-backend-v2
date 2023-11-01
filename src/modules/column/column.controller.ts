import { Controller, Get } from '@nestjs/common'
import { ColumnService } from './column.service'

@Controller('column')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Get()
  async getAll() {
    return await this.columnService.getByCondition()
  }
}
