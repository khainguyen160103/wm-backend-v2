import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { BaseEntity, DeepPartial, Repository, FindOneOptions } from 'typeorm'
import { cloneDeep } from 'lodash'
import { BaseServiceOptions } from './types/options.types'

@Injectable()
export class BaseService<T extends BaseEntity> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async beforeGet(options?: BaseServiceOptions | undefined) {
    if (!options) {
      options = {}
    } else {
      if (options.select) {
        if (!options.select.length) delete options.select
      }
    }

    return options
  }

  async afterGet(result: T | T[]) {
    if (!result) return result

    if (this.genericRepository.metadata.name === 'account' || 'Account') delete (result as any).password

    return result
  }

  async getByCondition(query?: any, options: BaseServiceOptions = {}): Promise<T[]> {
    if (Object.keys(options).length) this.beforeGet(options)

    const result = await this.genericRepository.find({
      where: { ...query },
      ...(options as any),
    })

    this.afterGet(result)

    return result
  }

  async getOneByCondition(query?: any, options: BaseServiceOptions = {}): Promise<T> {
    if (Object.keys(options).length) this.beforeGet(options)

    const result = await this.genericRepository.findOne({ where: { ...query }, ...(options as any) })

    this.afterGet(result)

    return result
  }

  async getById(id: string | number, options: BaseServiceOptions = {}): Promise<T> {
    if (Object.keys(options).length) this.beforeGet(options)

    const result = await this.genericRepository.findOne(id, options as any)

    if (!result) {
      throw new NotFoundException('Not found')
    }

    this.afterGet(result)

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
      const user = cloneDeep(model) as any
      if (user.accountId) {
        const exist = await (this.genericRepository as any).findOne({ where: { id } })
        if (exist.created_by_id === user.accountId) return new UnauthorizedException('Dont have permission') as any
      }

      const country: T = await this.getById(id)
      const updatedCountry = Object.assign(country, model)
      await this.genericRepository.save(updatedCountry)
      return this.getById(id)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async list(query?: any, options: BaseServiceOptions = {}) {
    if (Object.keys(options).length) this.beforeGet(options)

    const take = query?.take || 10
    const skip = query?.skip || 0

    const [result, total] = await this.genericRepository.findAndCount({
      where: {},
      take: take,
      skip: skip,
    })

    return {
      data: result,
      count: total,
    }
  }
}
