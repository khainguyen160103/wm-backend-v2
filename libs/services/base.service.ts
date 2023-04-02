import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { BaseEntity, DeepPartial, Repository } from 'typeorm'

@Injectable()
export class BaseService<T extends BaseEntity> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async get(query: any): Promise<T[]> {
    return await this.genericRepository.find(query)
  }

  async getById(id: string | number): Promise<T> {
    const result = await this.genericRepository.findOne(id)
    if (!result) {
      throw new NotFoundException('Not found')
    }

    return result
  }

  async create(model: DeepPartial<T>): Promise<T> {
    try {
      const country = await this.genericRepository.create(model)
      return country.save()
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async delete(id: string | number): Promise<{ message: string }> {
    const result = await this.genericRepository.delete(id)

    if (result.affected === 0) {
      return new NotFoundException('Not found')
    }
    return { message: 'success' }
  }

  async update(id: string | number, model: DeepPartial<T>): Promise<T> {
    try {
      const country: T = await this.getById(id)
      const updatedCountry = Object.assign(country, model)
      return await this.genericRepository.save(updatedCountry)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
