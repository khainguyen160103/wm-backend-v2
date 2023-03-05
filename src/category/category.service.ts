import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Category } from './entities'
import { CategoryRepository } from './repository/category.repository'

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(public repository: CategoryRepository) {
    super(repository)
  }
}
