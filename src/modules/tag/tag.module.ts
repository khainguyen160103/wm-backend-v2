import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'
import { Tag } from './entities'
import { AccountModule } from '../account/account.module'

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), AccountModule],
  controllers: [TagController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    TagService,
  ],
  exports: [TagService],
})
export class TagModule {}
