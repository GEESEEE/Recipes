import * as fs from 'fs'
import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Redis } from 'ioredis'
import { RegisterParams } from '@recipes/api-types/v1'
import { TYPES } from '@/utils/constants'
import { AuthError, OAuthError } from '@/types'
import { Settings, User, Token } from '@/entities'

const publicKey = fs.readFileSync('public.key', 'utf-8')
const privateKey = fs.readFileSync('private.key', 'utf-8')

@injectable()
export default class AuthService {
    @inject(TYPES.UserRepository)
    private readonly userRepository!: Repository<User>

    @inject(TYPES.TokenRepository)
    private readonly tokenRepository!: Repository<Token>

    @inject(TYPES.SettingsRepository)
    private readonly settingsRepository!: Repository<Settings>

    @inject(TYPES.Redis)
    private readonly redis!: Redis

    public async signUp({
        name,
        password,
        email,
    }: RegisterParams): Promise<true | AuthError> {
        let user = await this.userRepository.findOne({ name })
        if (typeof user !== 'undefined') {
            return AuthError.USER_EXISTS
        }

        user = await this.userRepository.findOne({ email })
        if (typeof user !== 'undefined') {
            return AuthError.EMAIL_EXISTS
        }

        const settings = await this.settingsRepository.save(
            this.settingsRepository.create({})
        )

        user = await this.userRepository.save(
            this.userRepository.create({
                name,
                password,
                email,
                settings,
            })
        )

        return true
    }

    public async signOut(token: string): Promise<true | OAuthError> {
        const result = await this.tokenRepository.delete({ token })
        if (result.affected === 0) {
            return OAuthError.INVALID_GRANT
        }
        await this.redis.lpush('token', token)
        return true
    }

    // Helper functions

    public async verifyPassword(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }

    public signToken(payload: Record<string, unknown>): string {
        return jwt.sign(payload, privateKey, { algorithm: 'RS256' })
    }

    public verifyToken(token: string): string | jwt.JwtPayload | OAuthError {
        try {
            return jwt.verify(token, publicKey, { algorithms: ['RS256'] })
        } catch (err) {
            return OAuthError.INVALID_GRANT
        }
    }
}
