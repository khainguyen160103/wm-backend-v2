import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { Account } from './entities'
import { Project } from '../project/entities'

@Module({
  imports: [TypeOrmModule.forFeature([Account, Project])],
  controllers: [AccountController],
  providers: [
    AccountService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
  exports: [AccountService],
})
export class AccountModule {}
