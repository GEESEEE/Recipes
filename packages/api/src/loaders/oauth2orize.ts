import { Container } from 'inversify'
import oauth2orize, {
    DeserializeClientDoneFunction,
    ExchangeDoneFunction,
    SerializeClientDoneFunction,
    TokenError,
} from 'oauth2orize'
import { Repository } from 'typeorm'
import { User, Token, Application } from '../entities'
import { AuthService } from '../services'
import { TYPES } from '../util/constants'

export default function init(container: Container): oauth2orize.OAuth2Server {
    const applicationRepository = container.get<Repository<Application>>(
        TYPES.ApplicationRepository
    )

    const userRepository = container.get<Repository<User>>(TYPES.UserRepository)

    const tokenRepository = container.get<Repository<Token>>(
        TYPES.TokenRepository
    )
    const authService = container.get<AuthService>(TYPES.AuthService)

    const server = oauth2orize.createServer()

    server.serializeClient(function (
        client: any,
        done: SerializeClientDoneFunction
    ) {
        return done(null, client)
    })

    server.deserializeClient(function (
        uid: string,
        done: DeserializeClientDoneFunction
    ) {
        applicationRepository
            .findOne({ where: { uid } })
            .then((client) => {
                return done(null, client)
            })
            .catch((err) => done(err))
    })

    server.exchange(
        oauth2orize.exchange.password(
            {},
            function (
                _client: any,
                username: string,
                password: string,
                _scope: string[],
                body: any,
                done: ExchangeDoneFunction
            ) {
                applicationRepository
                    .findOne({ where: { uid: body.client_id } })
                    .then(async (app) => {
                        if (typeof app === 'undefined') {
                            return done(
                                new TokenError(
                                    'Unauthorized Client',
                                    'unauthorized_client'
                                )
                            )
                        } else {
                            const user = await userRepository.findOne({
                                where: [
                                    { name: username },
                                    { email: username },
                                ],
                            })
                            if (typeof user === 'undefined') {
                                return done(
                                    new TokenError(
                                        'Invalid Username',
                                        'invalid_client'
                                    )
                                )
                            } else {
                                const validPassword =
                                    await authService.verifyPassword(
                                        password,
                                        user.password
                                    )
                                if (validPassword) {
                                    const token = authService.signToken({
                                        id: user.id,
                                    })
                                    const tokenInstance =
                                        await tokenRepository.save(
                                            tokenRepository.create({
                                                token,
                                                applicationId: app.id,
                                                userId: user.id,
                                            })
                                        )
                                    return done(null, tokenInstance.token)
                                }
                                return done(
                                    new TokenError(
                                        'Invalid Password',
                                        'invalid_grant'
                                    )
                                )
                            }
                        }
                    })
                    .catch((err) => done(err))
            }
        )
    )

    container.bind<any>(TYPES.TokenMiddleware).toConstantValue(server.token())

    return server
}
