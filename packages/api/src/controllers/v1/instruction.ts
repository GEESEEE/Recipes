import { body, param, ValidationChain } from 'express-validator'
import {
    controller,
    httpDelete,
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
    InstructionCreate,
    ModifyError,
    InstructionUpdate,
} from '@recipes/api-types/v1'

import { constants, Validator } from '@/utils'
import { RecipeService } from '@/services'
import { InstructionResult } from '@/types'

const { TYPES } = constants

@controller('/v1/sections/:sectionId/recipes/:recipeId/instructions')
export default class InstructionController implements interfaces.Controller {
    @inject(TYPES.RecipeService)
    private readonly recipeService!: RecipeService

    @inject(TYPES.Validator)
    private readonly validator!: Validator

    @httpPost(
        '/bulk',
        TYPES.PassportMiddleware,
        ...InstructionController.validate('addInstructions'),
        TYPES.ErrorMiddleware
    )
    public async addInstructions(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number,
        @requestParam('recipeId') recipeId: number,
        @requestBody() body: Array<InstructionCreate>
    ): Promise<InstructionResult[] | ModifyError> {
        const validationResult = (
            await this.validator.validateRecipes(
                req.user?.id as number,
                sectionId,
                [recipeId]
            )
        )[0]
        if (this.validator.isError(validationResult)) {
            return this.validator.throwError(validationResult)
        }
        return await this.recipeService.addInstructions(recipeId, body)
    }

    @httpPut(
        '/bulk',
        TYPES.PassportMiddleware,
        ...InstructionController.validate('updateInstructions'),
        TYPES.ErrorMiddleware
    )
    public async updateInstructions(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number,
        @requestParam('recipeId') recipeId: number,
        @requestBody() body: Array<InstructionUpdate>
    ): Promise<Array<InstructionResult | ModifyError>> {
        const validationResults = await this.validator.validateInstructions(
            req.user?.id as number,
            sectionId,
            recipeId,
            body.map((instr) => instr.id)
        )

        const [validInstructions, modifyErrors] =
            this.validator.splitResults(validationResults)

        const updateObjects = validInstructions.map((instr) => {
            const updateObj = body.find((i) => i.id === instr.id)
            return { ...instr, ...updateObj }
        })

        const newInstructions = await this.recipeService.updateInstructions(
            updateObjects
        )
        return [...newInstructions, ...modifyErrors]
    }

    @httpDelete(
        '/bulk',
        TYPES.PassportMiddleware,
        ...InstructionController.validate('deleteInstructions'),
        TYPES.ErrorMiddleware
    )
    public async deleteInstructions(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number,
        @requestParam('recipeId') recipeId: number,
        @requestBody() body: number[]
    ): Promise<Array<boolean | ModifyError>> {
        const validationResults = await this.validator.validateInstructions(
            req.user?.id as number,
            sectionId,
            recipeId,
            body
        )

        const [validInstructions, modifyErrors] =
            this.validator.splitResults(validationResults)

        const deleteIds = validInstructions.map((instr) => instr.id)
        const deleted = await this.recipeService.deleteInstructions(deleteIds)
        const results: boolean[] = new Array(deleted).fill(true)
        return [...results, ...modifyErrors]
    }

    // #region validate
    private static validate(method: string): ValidationChain[] {
        const base = [
            param('sectionId').isInt().toInt(),
            param('recipeId').isInt().toInt(),
        ]
        switch (method) {
            case 'addInstructions':
                return [
                    ...base,
                    body().isArray(),
                    body('*.text').exists().isString(),
                    body('*.position').isInt().toInt(),
                ]

            case 'updateInstructions':
                return [
                    ...base,
                    body().isArray(),
                    body('*.id').isInt().toInt(),
                    body('*.text').optional().isString(),
                    body('*.position').optional().isInt(),
                ]

            case 'deleteInstructions':
                return [...base, body().isArray(), body('*').isInt().toInt()]

            default:
                return [...base]
        }
    }
    // #endregion
}
