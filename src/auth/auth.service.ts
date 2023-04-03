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

    console.log('user password', dto.password)
    console.log('hash', hash)
    const user = await this.userService.create({ email: dto.email, password: hash, username: dto.email })

    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRtHash(user.id, tokens.refresh_token)

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
    await this.updateRtHash(user.id, tokens.refresh_token)

    return tokens
  }

  // update refresh token to null
  async logout(userId: number): Promise<boolean> {
    await this.userService.update(userId, {
      refresh_token: null,
    })
    return true
  }

  // async refreshTokens(userId: number, rt: string): Promise<Tokens> {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //   })
  //   if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied')

  //   const rtMatches = await argon.verify(user.hashedRt, rt)
  //   if (!rtMatches) throw new ForbiddenException('Access Denied')

  //   const tokens = await this.getTokens(user.id, user.email)
  //   await this.updateRtHash(user.id, tokens.refresh_token)

  //   return tokens
  // }

  async updateRtHash(userId: number, refresh_token: string): Promise<void> {
    const hash = await bcrypt.hash(refresh_token, SALT_ROUNDS)
    await this.userService.update(userId, {
      refresh_token: hash,
    })
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    }

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ])

    console.log('at', at)
    console.log('rt', rt)

    return {
      access_token: at,
      refresh_token: rt,
    }
  }
}
