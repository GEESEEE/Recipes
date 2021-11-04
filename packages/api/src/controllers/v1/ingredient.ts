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
    RecipeIngredientCreate,
    ModifyError,
    RecipeIngredientUpdate,
} from '@recipes/api-types/v1'
import { constants, Validator } from '@/utils'
import { RecipeService } from '@/services'
import { RecipeIngredientResult } from '@/types'

const { TYPES } = constants

@controller('/v1/sections/:sectionId/recipes/:recipeId/ingredients')
export default class IngredientController implements interfaces.Controller {
    @inject(TYPES.RecipeService)
    private readonly recipeService!: RecipeService

    @inject(TYPES.Validator)
    private readonly validator!: Validator

    @httpPost(
        '/bulk',
        TYPES.PassportMiddleware,
        ...IngredientController.validate('addIngredients'),
        TYPES.ErrorMiddleware
    )
    public async addIngredients(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number,
        @requestParam('recipeId') recipeId: number,
        @requestBody() body: Array<RecipeIngredientCreate>
    ): Promise<RecipeIngredientResult[] | ModifyError> {
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
        return await this.recipeService.addRecipeIngredients(recipeId, body)
    }

    @httpPut(
        '/bulk',
        TYPES.PassportMiddleware,
        ...IngredientController.validate('updateIngredients'),
        TYPES.ErrorMiddleware
    )
    public async updateIngredients(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number,
        @requestParam('recipeId') recipeId: number,
        @requestBody() body: Array<RecipeIngredientUpdate>
    ): Promise<Array<RecipeIngredientResult | ModifyError>> {
        const validationResults = await this.validator.validateIngredients(
            req.user?.id as number,
            sectionId,
            recipeId,
            body.map((instr) => instr.id)
        )

        const [validIngredients, modifyErrors] =
            this.validator.splitResults(validationResults)

        const updateObjects = validIngredients.map((ingr) => {
            const updateObj = body.find((i) => i.id === ingr.id)
            return { ...ingr, ...updateObj }
        })

        const newIngredients = await this.recipeService.updateRecipeIngredients(
            updateObjects
        )
        return [...newIngredients, ...modifyErrors]
    }

    @httpDelete(
        '/bulk',
        TYPES.PassportMiddleware,
        ...IngredientController.validate('deleteIngredients'),
        TYPES.ErrorMiddleware
    )
    public async deleteIngredients(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number,
        @requestParam('recipeId') recipeId: number,
        @requestBody() body: number[]
    ): Promise<Array<boolean | ModifyError>> {
        const validationResults = await this.validator.validateIngredients(
            req.user?.id as number,
            sectionId,
            recipeId,
            body
        )
        const [validIngredients, modifyErrors] =
            this.validator.splitResults(validationResults)

        const deleteIds = validIngredients.map((ingr) => ingr.id)
        const deleted = await this.recipeService.removeRecipeIngredients(
            recipeId,
            deleteIds
        )
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
            case 'addIngredients':
                return [
                    ...base,
                    body().isArray(),
                    body('*.amount').isInt().toInt(),
                    body('*.position').isInt().toInt(),
                    body('*.name').exists().isString(),
                    body('*.unit').optional({ nullable: true }).isString(),
                ]

            case 'updateIngredients':
                return [
                    ...base,
                    body().isArray(),
                    body('*.id').isInt().toInt(),
                    body('*.amount').optional().isFloat().toFloat(),
                    body('*.position').optional().isInt().toInt(),
                    body('*.name').optional().isString(),
                    body('*.unit').optional({ nullable: true }).isString(),
                ]

            case 'deleteIngredients':
                return [...base, body().isArray(), body('*').isInt().toInt()]

            default:
                return [...base]
        }
    }
    // #endregion
}
