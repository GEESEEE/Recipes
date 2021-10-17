import { Section, Settings, User } from '../../entities'
import { body, param, ValidationChain } from 'express-validator'
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    interfaces,
    request,
    requestBody,
    requestParam,
} from 'inversify-express-utils'
import { Request } from 'express'
import { constants } from '../../util'
import { ThemeType } from '../../util/constants'
import { inject } from 'inversify'
import { SectionService, UserService } from '../../services'
import { BadRequestError } from '../../errors'
import { ModifyError } from './base'

const { TYPES } = constants

@controller('/v1/users')
export default class UserController implements interfaces.Controller {
    @inject(TYPES.UserService) private readonly userService!: UserService

    @inject(TYPES.SectionService) private readonly sectionsService!: SectionService


    @httpGet(
        '/',
        TYPES.PassportMiddleware,
        ...UserController.validate('getUser'),
        TYPES.ErrorMiddleware
    )
    public async getUser(@request() req: Request): Promise<User> {
        return req.user as User
    }

    // #region Settings

    @httpGet(
        '/settings',
        TYPES.PassportMiddleware,
        ...UserController.validate('getSettings'),
        TYPES.ErrorMiddleware
    )
    public async getSettings(@request() req: Request): Promise<Settings> {
        const settingsId = req.user?.settingsId as number
        return await this.userService.getSettings(settingsId)
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
            body: { theme?: ThemeType; color?: string; invertedColors?: boolean }
    ): Promise<Settings> {
        const colorRegex = /^#[0-9A-F]{6}$/i
        if (
            typeof body.color !== 'undefined' &&
            body.color.match(colorRegex) == null
        ) {
            throw new BadRequestError('Invalid color')
        }

        const settings = { id: req.user?.settingsId as number, ...body }
        return await this.userService.updateSettings(settings)
    }

    // #endregion

    // #region Sections

    private async validateSection(userId: number, sectionId: number): Promise<Section | ModifyError> {
        const section = await this.sectionsService.getSection(sectionId)
        if (typeof section === 'undefined') {
            return {
                id: sectionId,
                statusCode: 404,
                statusMessage: 'Provided sectionId was not found'
            }
        }
        if (section.userId !== userId) {
            return {
                id: sectionId,
                statusCode: 403,
                statusMessage: 'Provided section does not belong to the requesting user'
            }
        }
        return section
    }

    @httpPost(
        '/sections',
        TYPES.PassportMiddleware,
        ...UserController.validate('createSection'),
        TYPES.ErrorMiddleware
    )
    public async createSection(
        @request() req: Request,
        @requestBody()
            body: {
                name: string,
                description: string,
            }
    ): Promise<Section> {
        const section: any = {
            ...body,
            userId: req.user?.id
        }
        return (await this.sectionsService.createSections([section]))[0]
    }

    @httpGet(
        '/sections',
        TYPES.PassportMiddleware,
        ...UserController.validate('getSections'),
        TYPES.ErrorMiddleware
    )
    public async getSections(
        @request() req: Request,
    ): Promise<Section[]> {
        return await this.sectionsService.getSectionsFromUser(req.user?.id as number)
    }

    @httpPut(
        '/sections/:sectionId',
        TYPES.PassportMiddleware,
        ...UserController.validate('updateSection'),
        TYPES.ErrorMiddleware
    )
    public async updateSection(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number,
        @requestBody()
            body: {
                name?: string
                description?: string
            }
    ): Promise<Section | ModifyError> {
        const validationResult = await this.validateSection(req.user?.id as number, sectionId)
        if (validationResult instanceof Section) {
            return await this.sectionsService.updateSection(validationResult, body)
        }
        return validationResult
    }

    @httpDelete(
        '/sections/:sectionId',
        TYPES.PassportMiddleware,
        ...UserController.validate('deleteSection'),
        TYPES.ErrorMiddleware
    )
    public async deleteSection(
        @request () req: Request,
        @requestParam('sectionId') sectionId: number
    ): Promise<boolean | ModifyError> {
        const validationResult = await this.validateSection(req.user?.id as number, sectionId)
        if (validationResult instanceof Section) {
            return await this.sectionsService.deleteSection(sectionId)
        }
        return validationResult
    }

    // //#endregion

    // #region validate
    private static validate(method: string): ValidationChain[] {
        switch (method) {
        case 'getUser':
            return []

        case 'getSettings':
            return []

        case 'updateSettings':
            return [
                body('theme').optional().isIn(Object.values(ThemeType)),
                body('color').optional().isString(),
                body('invertedColors').optional().isBoolean(),
            ]

        case 'createSection': return [
            body('name').exists().isString(),
            body('description').exists().isString(),
        ]

        case 'getSections': return []
        case 'updateSection': return [
            param('sectionId').isInt().toInt(),
            body('name').optional().isString(),
            body('description').optional().isString(),
        ]

        case 'deleteSection': return [
            param('sectionId').isInt().toInt(),
        ]

        default:
            return []
        }
    }
    // #endregion
}
