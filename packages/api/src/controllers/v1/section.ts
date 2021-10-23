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
import { inject } from 'inversify'
import {
    ModifyError,
    RequestError,
    WithoutId,
    SectionCreate,
    SectionUpdate,
} from '@recipes/api-types/v1'
import { constants } from '@/utils'
import { SectionService } from '@/services'
import { SectionResult } from '@/types'

const { TYPES } = constants

@controller('/v1/sections')
export default class SectionController implements interfaces.Controller {
    @inject(TYPES.SectionService)
    private readonly sectionsService!: SectionService

    private async validateSection(
        userId: number,
        sectionId: number
    ): Promise<SectionResult | ModifyError> {
        const section = await this.sectionsService.getSection(sectionId)
        if (typeof section === 'undefined') {
            return {
                id: sectionId,
                statusCode: RequestError.NOT_FOUND,
                statusMessage: 'Provided sectionId was not found',
            }
        }
        if (section.userId !== userId) {
            return {
                id: sectionId,
                statusCode: RequestError.FORBIDDEN,
                statusMessage:
                    'Provided section does not belong to the requesting user',
            }
        }
        return section
    }

    @httpPost(
        '/',
        TYPES.PassportMiddleware,
        ...SectionController.validate('createSection'),
        TYPES.ErrorMiddleware
    )
    public async createSection(
        @request() req: Request,
        @requestBody()
        body: SectionCreate
    ): Promise<SectionResult> {
        const section: any = {
            ...body,
            userId: req.user?.id,
        }
        return (await this.sectionsService.createSections([section]))[0]
    }

    @httpGet(
        '/',
        TYPES.PassportMiddleware,
        ...SectionController.validate('getSections'),
        TYPES.ErrorMiddleware
    )
    public async getSections(
        @request() req: Request
    ): Promise<SectionResult[]> {
        return await this.sectionsService.getSectionsFromUser(
            req.user?.id as number
        )
    }

    @httpPut(
        '/:sectionId',
        TYPES.PassportMiddleware,
        ...SectionController.validate('updateSection'),
        TYPES.ErrorMiddleware
    )
    public async updateSection(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number,
        @requestBody()
        body: WithoutId<SectionUpdate>
    ): Promise<SectionResult | ModifyError> {
        const validationResult = await this.validateSection(
            req.user?.id as number,
            sectionId
        )
        if ('statusCode' in validationResult) {
            return validationResult
        }
        return await this.sectionsService.updateSection(validationResult, body)
    }

    @httpDelete(
        '/:sectionId',
        TYPES.PassportMiddleware,
        ...SectionController.validate('deleteSection'),
        TYPES.ErrorMiddleware
    )
    public async deleteSection(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number
    ): Promise<boolean | ModifyError> {
        const validationResult = await this.validateSection(
            req.user?.id as number,
            sectionId
        )
        if ('statusCode' in validationResult) {
            return validationResult
        }
        return await this.sectionsService.deleteSection(sectionId)
    }

    // //#endregion

    // #region validate
    private static validate(method: string): ValidationChain[] {
        switch (method) {
            case 'createSection':
                return [
                    body('position').isInt().toInt(),
                    body('name').exists().isString(),
                    body('description').exists().isString(),
                ]

            case 'getSections':
                return []
            case 'updateSection':
                return [
                    param('sectionId').isInt().toInt(),
                    body('position').optional().isInt(),
                    body('name').optional().isString(),
                    body('description').optional().isString(),
                ]

            case 'deleteSection':
                return [param('sectionId').isInt().toInt()]

            default:
                return []
        }
    }
    // #endregion
}
