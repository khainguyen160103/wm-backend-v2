import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'
import { Project } from './entities'
import { AccountModule } from '../account/account.module'

@Module({
  imports: [TypeOrmModule.forFeature([Project]), AccountModule],
  controllers: [ProjectController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    ProjectService,
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
