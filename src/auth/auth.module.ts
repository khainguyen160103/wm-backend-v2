import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AtStrategy } from './strategies'

@Module({
  imports: [UserModule, JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy],
})
export class AuthModule {}
