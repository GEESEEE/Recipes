import { ValidationChain, body, header } from 'express-validator'
import {
    controller,
    httpGet,
    httpPost,
    interfaces,
    request,
    requestBody,
    requestHeaders,
} from 'inversify-express-utils'
import { inject } from 'inversify'
import { Request } from 'express'
import { capitalize } from '@recipes/api-types/utils'
import { RegisterParams } from '@recipes/api-types/v1'
import { constants } from '@/utils'
import { AuthService } from '@/services'
import { AuthError, OAuthError } from '@/types'
import { BadRequestError, ConflictError } from '@/errors'
import ValidationError from '@/errors/validation'
import { User } from '@/entities'

const { TYPES } = constants

@controller('/v1/auth')
export default class AuthController implements interfaces.Controller {
    @inject(TYPES.AuthService) private readonly authService!: AuthService

    // #region Auth
    @httpPost(
        '/register',
        ...AuthController.validate('signUp'),
        TYPES.ErrorMiddleware
    )
    public async signUp(@requestBody() body: RegisterParams): Promise<true> {
        let res
        try {
            res = await this.authService.signUp(body)
        } catch (err) {
            if (err instanceof ValidationError) {
                const property = err.data[0].property
                throw new BadRequestError(`Invalid ${capitalize(property)}`)
            }
            throw err
        }

        if (res === AuthError.USER_EXISTS) {
            throw new ConflictError('Username already in use')
        }
        if (res === AuthError.EMAIL_EXISTS) {
            throw new ConflictError('Email already in use')
        }

        return res
    }

    @httpPost('/token', TYPES.TokenMiddleware)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public signIn(): void {}

    @httpGet('/info', TYPES.PassportMiddleware, TYPES.ErrorMiddleware)
    public async verifyToken(@request() req: Request): Promise<User> {
        return req.user as User
    }

    @httpPost(
        '/revoke',
        TYPES.PassportMiddleware,
        ...AuthController.validate('signOut'),
        TYPES.ErrorMiddleware
    )
    public async signOut(
        @requestHeaders() headers: { authorization: string }
    ): Promise<true> {
        const token = headers.authorization.split(' ')[1]
        const result = await this.authService.signOut(token)

        if (typeof result === 'boolean') {
            return result
        }

        if (result === OAuthError.INVALID_GRANT) {
            throw new BadRequestError('Invalid Token')
        }
        throw new BadRequestError('Invalid Signout')
    }

    // #endregion

    // #region validate
    private static validate(method: string): ValidationChain[] {
        switch (method) {
            case 'signUp':
                return [
                    body('name').exists().isString(),
                    body('password').exists().isString(),
                    body('email').exists().isString(),
                ]

            case 'signOut':
                return [header('authorization').exists().isString()]

            default:
                return []
        }
    }
    // #endregion
}
