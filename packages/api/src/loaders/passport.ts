import passport from 'passport'
import { Container } from 'inversify'
import { Repository } from 'typeorm'
import { Strategy } from 'passport-http-bearer'
import { fitToClass } from '@recipes/api-types/utils'
import { TYPES } from '@/utils/constants'
import { OAuthError, UserResult } from '@/types'
import { AuthService } from '@/services'
import { Token, User } from '@/entities'

export default function init(container: Container): void {
    const userRepository = container.get<Repository<User>>(TYPES.UserRepository)
    const tokenRepository = container.get<Repository<Token>>(
        TYPES.TokenRepository
    )
    const authService = container.get<AuthService>(TYPES.AuthService)
    const redis = container.get<any>(TYPES.Redis)

    passport.use(
        new Strategy(function (
            token: string,
            done: (error: any, user?: any, info?: any) => void
        ): void {
            const result: any = authService.verifyToken(token)
            if (result === OAuthError.INVALID_GRANT) {
                return done(null, false, { message: 'Invalid Token' })
            }

            // To reset redis:
            // redis.del(result.id)
            // redis.del('token')
            redis
                .lrange('token', 0, 999_999_999)
                .then(async (revokedTokens: string[]): Promise<void> => {
                    if (!revokedTokens.includes(token)) {
                        const userString = await redis.get(result.id)

                        if (userString !== null) {
                            try {
                                const redisUser = JSON.parse(userString)
                                return done(null, redisUser)
                            } catch (err) {}
                        }
                    }

                    const tok = await tokenRepository.findOne({ token })

                    if (typeof tok === 'undefined') {
                        return done(null, false, { message: 'Token not found' })
                    }

                    const user = await userRepository.findOne({
                        where: { id: result.id },
                        relations: ['settings'],
                    })

                    if (typeof user === 'undefined') {
                        return done(null, false, { message: 'User not found' })
                    }

                    const userResult = fitToClass(
                        user as Required<User>,
                        UserResult
                    )

                    await redis.set(userResult.id, JSON.stringify(userResult))
                    return done(null, userResult)
                })
                .catch((err: any) => console.log(err))
        })
    )
}
