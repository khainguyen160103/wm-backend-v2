import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { SignInDto, SignUpDto } from './dto'
import * as bcrypt from 'bcrypt'
import { AccountService } from 'src/modules/account/account.service'
import { JwtPayload, Tokens } from './types'

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10

@Injectable()
export class AuthService {
  constructor(private accountService: AccountService, private jwtService: JwtService, private config: ConfigService) {}

  async createAccount(dto: SignUpDto): Promise<Tokens> {
    const { email, password, name } = dto

    let user = await this.accountService.getByEmail({
      email,
    })

    if (user) throw new ForbiddenException('Account already exist')

    const hash = await bcrypt.hash(password, SALT_ROUNDS)

    user = await this.accountService.create({ email, password: hash, name: email || name })

    const tokens = await this.getTokens(user.id, user.email)

    return tokens
  }

  async signinLocal(dto: SignInDto): Promise<Tokens> {
    const user = await this.accountService.getByEmail({
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
