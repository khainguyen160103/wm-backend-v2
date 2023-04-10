import { Module } from '@nestjs/common'
import { MediaService } from './media.service'
import { MediaController } from './media.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MediaRepository } from './repository/media.repository'
import { MulterModule } from '@nestjs/platform-express'
import { imageFileFilter, setFileName } from 'src/utils/media'

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaRepository]),
    MulterModule.register({
      dest: 'uploads',
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
