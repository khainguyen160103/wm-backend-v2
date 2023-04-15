import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { CategoryService } from './category.service'
import { Category } from './entities'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(query: any): Promise<Category[]> {
    return this.categoryService.getByCondition(query)
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id') id: string | number): Promise<Category> {
    return this.categoryService.getById(id)
  }
}
