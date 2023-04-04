/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './repository/user.repository'
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
