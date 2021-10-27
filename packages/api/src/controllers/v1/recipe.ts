import { body, param, ValidationChain } from 'express-validator'
import {
    controller,
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
        if ('statusCode' in validationResult) {
            return this.validator.validateError(validationResult)
        }
        const recipes = await this.recipeService.getRecipesByScopes(
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
        if ('statusCode' in validationResult) {
            return this.validator.validateError(validationResult)
        }
        return await this.recipeService.createRecipes(
            body.map((recipe) => ({ ...recipe, sectionId }))
        )
    }

    @httpPut(
        '/:recipeId',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('updateRecipe'),
        TYPES.ErrorMiddleware
    )
    public async updateRecipe(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number,
        @requestParam('recipeId') recipeId: number,
        @requestBody() body: RecipeUpdate
    ): Promise<RecipeResult | ModifyError> {
        const validationResult = (
            await this.validator.validateSections(req.user?.id as number, [
                sectionId,
            ])
        )[0]
        if ('statusCode' in validationResult) {
            return this.validator.validateError(validationResult)
        }
        // TODO validate that recipe is included in section
        console.log('Update recipe', recipeId, body)
        return new RecipeResult()
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
                    body('*.createdAt').optional().isDate(),
                    body('*.publishedAt').optional().isDate(), // Should also check null
                    body('*.copyOf').optional().isInt().toInt(), // should also check null?
                ]

            case 'updateRecipe':
                return [...base, param('recipeId').isInt().toInt()]

            default:
                return []
        }
    }
    // #endregion
}
