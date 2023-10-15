import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { AccountRepository } from './repository/account.repository'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'
import { Account } from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
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
