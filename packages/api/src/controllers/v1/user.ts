import { body, ValidationChain } from 'express-validator'
import {
    controller,
    httpGet,
    httpPut,
    interfaces,
    request,
    requestBody,
} from 'inversify-express-utils'
import { Request } from 'express'
import { inject } from 'inversify'
import { Theme, SettingsUpdate, WithoutId } from '@recipes/api-types/v1'
import { constants } from '@/utils'
import { UserService } from '@/services'
import { BadRequestError } from '@/errors'
import { ReportResult, SettingsResult, UserResult } from '@/types'

const { TYPES } = constants

@controller('/v1/users')
export default class UserController implements interfaces.Controller {
    @inject(TYPES.UserService) private readonly userService!: UserService

    @httpGet(
        '/',
        TYPES.PassportMiddleware,
        ...UserController.validate('getUser'),
        TYPES.ErrorMiddleware
    )
    public async getUser(@request() req: Request): Promise<UserResult> {
        return req.user as UserResult
    }

    // #region Settings

    @httpGet(
        '/settings',
        TYPES.PassportMiddleware,
        ...UserController.validate('getSettings'),
        TYPES.ErrorMiddleware
    )
    public async getSettings(@request() req: Request): Promise<SettingsResult> {
        return req.user?.settings as SettingsResult
    }

    @httpPut(
        '/settings',
        TYPES.PassportMiddleware,
        ...UserController.validate('updateSettings'),
        TYPES.ErrorMiddleware
    )
    public async updateSettings(
        @request() req: Request,
        @requestBody()
        body: WithoutId<SettingsUpdate>
    ): Promise<SettingsResult> {
        const colorRegex = /^#[0-9A-F]{6}$/i
        if (
            typeof body.color !== 'undefined' &&
            body.color.match(colorRegex) == null
        ) {
            throw new BadRequestError('Invalid color')
        }

        const settings = { id: req.user?.settings.id as number, ...body }
        return await this.userService.updateSettings(settings)
    }

    // #endregion

    // @httpGet(
    //     '/reports',
    //     TYPES.PassportMiddleware,
    //     ...UserController.validate('getReports'),
    //     TYPES.ErrorMiddleware
    // )
    // public async getReports(@request() req: Request): Promise<ReportResult[]> {}

    // #region validate
    private static validate(method: string): ValidationChain[] {
        switch (method) {
            case 'getUser':
                return []

            case 'getSettings':
                return []

            case 'updateSettings':
                return [
                    body('theme').optional().isIn(Object.values(Theme)),
                    body('color').optional().isString(),
                    body('invertedColors').optional().isBoolean(),
                ]

            default:
                return []
        }
    }
    // #endregion
}
