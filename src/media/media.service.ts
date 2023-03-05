import { Injectable } from '@nestjs/common'
import { BaseService } from 'libs/services/base.service'
import { Media } from './entities'
import { MediaRepository } from './repository/media.repository'

@Injectable()
export class MediaService extends BaseService<Media> {
  constructor(private repository: MediaRepository) {
    super(repository)
  }
}
