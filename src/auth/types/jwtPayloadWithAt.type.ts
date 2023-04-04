import { JwtPayload } from '.'

export type JwtPayloadWithAt = JwtPayload & { refreshToken: string }
