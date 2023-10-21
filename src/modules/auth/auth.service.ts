import { ForbiddenException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ChangePasswordDto, SignInDto, SignUpDto } from './dto'
import * as bcrypt from 'bcrypt'
import { AccountService } from 'src/modules/account/account.service'
import { JwtPayload, Tokens } from './types'
import { randomColor, randomString } from 'src/utils'

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10
const DEFAULT_PASSWORD = '012345AX'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(private accountService: AccountService, private jwtService: JwtService, private config: ConfigService) {}

  async createAccount(dto: SignUpDto): Promise<Tokens> {
    const { email, name, gender, date_of_birth, phone } = dto

    let account = await this.accountService.getByEmail({
      email,
    })

    if (account) throw new ForbiddenException('Account already exist')
    const password = randomString(8) || DEFAULT_PASSWORD

    const hash = await bcrypt.hash(password, SALT_ROUNDS)

    account = await this.accountService.create({
      email,
      password: hash,
      name: email || name,
      gender,
      date_of_birth,
      phone,
      color: randomColor(),
    })

    const tokens = await this.getTokens(account.id, account.email)

    return tokens
  }

  async changePassword(dto: ChangePasswordDto) {
    const { email, password } = dto

    const account = await this.accountService.getByEmail({
      email,
    })

    if (!account) throw new ForbiddenException('Account is not exist')

    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    this.accountService.update(account.id, { password: hash })

    return true
  }

  async signinLocal(dto: SignInDto): Promise<Tokens> {
    const account = await this.accountService.getByEmail({
      email: dto.email,
    })

    if (!account) throw new ForbiddenException('Access Denied')

    const passwordMatches = await bcrypt.compare(dto.password, account.password)

    if (!passwordMatches) throw new ForbiddenException('Access Denied')

    const tokens = await this.getTokens(account.id, account.email)

    return tokens
  }

  // update refresh token to null
  async logout(accountId: number): Promise<boolean> {
    return true
  }

  async getTokens(accountId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: accountId,
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
