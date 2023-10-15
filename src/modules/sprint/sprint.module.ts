import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { SprintService } from './sprint.service'
import { SprintController } from './sprint.controller'
import { Sprint } from './entities'
import { AccountModule } from '../account/account.module'

@Module({
  imports: [TypeOrmModule.forFeature([Sprint]), AccountModule],
  controllers: [SprintController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    SprintService,
  ],
  exports: [SprintService],
})
export class SprintModule {}
