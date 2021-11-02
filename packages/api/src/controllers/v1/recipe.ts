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
import { ModifyError, RecipeCreate, RecipeUpdate } from '@recipes/api-types/v1'
import { constants, Validator } from '@/utils'
import { RecipeService } from '@/services'
import { RecipeResult } from '@/types'

const { TYPES } = constants

@controller('/v1/sections/:sectionId/recipes')
export default class RecipeController implements interfaces.Controller {
    @inject(TYPES.RecipeService)
    private readonly recipeService!: RecipeService

    @inject(TYPES.Validator)
    private readonly validator!: Validator

    @httpGet(
        '/',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('getRecipesBySectionId'),
        TYPES.ErrorMiddleware
    )
    public async getRecipesBySectionId(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number
    ): Promise<RecipeResult[] | ModifyError> {
        const validationResult = (
            await this.validator.validateSections(req.user?.id as number, [
                sectionId,
            ])
        )[0]
        if (this.validator.isError(validationResult)) {
            return this.validator.validateError(validationResult)
        }
        const recipes = await this.recipeService.getRecipes(
            ['section'],
            { sectionId },
            []
        )
        return recipes
    }

    @httpPost(
        '/bulk',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('createRecipes'),
        TYPES.ErrorMiddleware
    )
    public async createRecipes(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number,
        @requestBody() body: Array<Omit<RecipeCreate, 'sectionId'>>
    ): Promise<RecipeResult[] | ModifyError> {
        const validationResult = (
            await this.validator.validateSections(req.user?.id as number, [
                sectionId,
            ])
        )[0]

        if (this.validator.isError(validationResult)) {
            return this.validator.validateError(validationResult)
        }

        return await this.recipeService.createRecipes(
            body.map((recipe) => ({ ...recipe, sectionId }))
        )
    }

    @httpPut(
        '/bulk',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('updateRecipes'),
        TYPES.ErrorMiddleware
    )
    public async updateRecipes(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number,
        @requestBody() body: Array<RecipeUpdate>
    ): Promise<Array<RecipeResult | ModifyError>> {
        const recipeIds = body.map((recipe) => recipe.id)
        const validationResults = await this.validator.validateRecipes(
            req.user?.id as number,
            sectionId,
            recipeIds
        )

        const [validRecipes, modifyErrors] =
            this.validator.splitResults(validationResults)

        const updateObjects = validRecipes.map((recipe) => {
            const updateObj = body.find((r) => r.id === recipe.id)
            return { ...recipe, ...updateObj }
        })

        const newRecipes = await this.recipeService.updateRecipes(updateObjects)

        return [...newRecipes, ...modifyErrors]
    }

    @httpDelete(
        '/:recipeId',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('deleteRecipe'),
        TYPES.ErrorMiddleware
    )
    public async deleteRecipe(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number,
        @requestParam('recipeId') recipeId: number
    ): Promise<boolean | ModifyError> {
        const validationResult = (
            await this.validator.validateRecipes(
                req.user?.id as number,
                sectionId,
                [recipeId]
            )
        )[0]
        if (this.validator.isError(validationResult)) {
            return this.validator.validateError(validationResult)
        }
        return await this.recipeService.deleteRecipe(recipeId)
    }

    // #region validate
    private static validate(method: string): ValidationChain[] {
        const base = [param('sectionId').isInt().toInt()]
        switch (method) {
            case 'getRecipesBySectionId':
                return [...base]

            case 'createRecipes':
                return [
                    ...base,
                    body().isArray(),
                    body('*.name').exists().isString(),
                    body('*.description').exists().isString(),
                    body('*.prepareTime').isInt().toInt(),
                    body('*.peopleCount').isInt().toInt(),
                    body('*.position').isInt().toInt(),
                    body('*.publishedAt').optional({ nullable: true }).isDate(),
                    body('*.createdAt').optional().isDate(),
                    body('*.copyOf')
                        .optional({ nullable: true })
                        .isInt()
                        .toInt(),
                ]

            case 'updateRecipes':
                return [
                    ...base,
                    body().isArray(),
                    body('*.id').optional().toInt(),
                    body('*.sectionId').isInt().toInt(),
                    body('*.name').optional().isString(),
                    body('*.description').optional().isString(),
                    body('*.prepareTime').optional().isInt().toInt(),
                    body('*.peopleCount').optional().isInt().toInt(),
                    body('*.position').optional().isInt().toInt(),
                    body('*.publishedAt').optional({ nullable: true }).isDate(), // Should also check null]
                ]

            case 'deleteRecipe':
                return [...base, param('recipeId').isInt().toInt()]

            default:
                return []
        }
    }
    // #endregion
}
