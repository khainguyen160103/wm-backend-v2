/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto'
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/user/user.service'
import { JwtPayload, Tokens } from './types'

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService, private config: ConfigService) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await bcrypt.hash(dto.password, SALT_ROUNDS)

    const user = await this.userService.create({ email: dto.email, password: hash, username: dto.email })

    const tokens = await this.getTokens(user.id, user.email)

    return tokens
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.userService.getOneByCondition({
      email: dto.email,
    })

    if (!user) throw new ForbiddenException('Access Denied')

    const passwordMatches = await bcrypt.compare(dto.password, user.password)

    if (!passwordMatches) throw new ForbiddenException('Access Denied')

    const tokens = await this.getTokens(user.id, user.email)

    return tokens
  }

  // update refresh token to null
  async logout(userId: number): Promise<boolean> {
    return true
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    }

    const at = await this.jwtService.sign(jwtPayload, {
      secret: this.config.get<string>('AT_SECRET'),
      expiresIn: '7d',
    })

    return {
      access_token: at,
    }
  }
}
