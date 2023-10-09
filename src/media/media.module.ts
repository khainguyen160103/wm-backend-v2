import { Module } from '@nestjs/common'
import { MediaService } from './media.service'
import { MediaController } from './media.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MediaRepository } from './repository/media.repository'
import { MulterModule } from '@nestjs/platform-express'
import { UserModule } from 'src/account/user.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaRepository]),
    MulterModule.register({
      dest: 'uploads',
    }),
    UserModule,
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
