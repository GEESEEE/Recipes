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
import { ForbiddenError, NotFoundError } from '@/errors'

const { TYPES } = constants

@controller('/v1/sections')
export default class SectionController implements interfaces.Controller {
    @inject(TYPES.SectionService)
    private readonly sectionsService!: SectionService

    private async validateSections(
        userId: number,
        sectionIds: number[]
    ): Promise<Array<SectionResult | ModifyError>> {
        const sections = await this.sectionsService.getSectionsById(sectionIds)

        const res = sectionIds.map((id) => {
            const section = sections.find((s) => s.id === id)
            if (typeof section === 'undefined') {
                return {
                    id,
                    statusCode: RequestError.NOT_FOUND,
                    statusMessage: 'Provided sectionId was not found',
                }
            }
            if (section.userId !== userId) {
                return {
                    id,
                    statusCode: RequestError.FORBIDDEN,
                    statusMessage:
                        'Provided section does not belong to the requesting user',
                }
            }
            return section
        })

        return res
    }

    private validateOne(error: ModifyError): ModifyError {
        switch (error.statusCode) {
            case RequestError.NOT_FOUND:
                throw new NotFoundError(error.statusMessage)

            case RequestError.FORBIDDEN:
                throw new ForbiddenError(error.statusMessage)

            default:
                break
        }
        return error
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
        '/bulk',
        TYPES.PassportMiddleware,
        ...SectionController.validate('updateSections'),
        TYPES.ErrorMiddleware
    )
    public async updateSections(
        @request() req: Request,
        @requestBody() body: Array<SectionUpdate>
    ): Promise<Array<SectionResult | ModifyError>> {
        const userId = req.user?.id as number
        const validationResults = await this.validateSections(
            userId,
            body.map((section) => section.id)
        )

        const validSections: SectionResult[] = []
        const modifyErrors: ModifyError[] = []
        validationResults.forEach((result) => {
            if ('statusCode' in result) {
                modifyErrors.push(result)
            } else {
                validSections.push(result)
            }
        })

        const updateObjects = validSections.map((section) => {
            const updateObj = body.find(
                (s) => s.id === section.id
            ) as SectionUpdate
            return { ...section, ...updateObj }
        })
        const newSections = await this.sectionsService.updateSections(
            updateObjects
        )
        return [...newSections, ...modifyErrors]
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
        const validationResult = (
            await this.validateSections(req.user?.id as number, [sectionId])
        )[0]
        if ('statusCode' in validationResult) {
            return this.validateOne(validationResult)
        }
        return await this.sectionsService.updateSection({
            ...validationResult,
            ...body,
        })
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
        const validationResult = (
            await this.validateSections(req.user?.id as number, [sectionId])
        )[0]
        if ('statusCode' in validationResult) {
            return this.validateOne(validationResult)
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

            case 'updateSections':
                return [
                    body('*.id').isInt().toInt(),
                    body('*.position').optional().isInt(),
                    body('*.name').optional().isString(),
                    body('*.description').optional().isString(),
                ]

            case 'deleteSection':
                return [param('sectionId').isInt().toInt()]

            default:
                return []
        }
    }
    // #endregion
}
