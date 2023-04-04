import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AtStrategy } from './strategies'

@Module({
  imports: [JwtModule.register({ global: true }), ConfigModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
