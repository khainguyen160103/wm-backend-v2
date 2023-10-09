import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './account.controller'
import { UserService } from './account.service'
import { UserRepository } from './repository/account.repository'
import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from 'src/common/guards'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
