import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AtStrategy } from './strategies'
import { AccountModule } from 'src/modules/account/account.module'

@Module({
  imports: [JwtModule.register({ global: true }), ConfigModule, AccountModule],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
