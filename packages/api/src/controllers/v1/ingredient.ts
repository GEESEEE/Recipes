import { ValidationChain, body, param } from 'express-validator'
import {
    controller,
    httpDelete,
    httpPost,
    httpGet,
    interfaces,
    requestBody,
    requestParam,
} from 'inversify-express-utils'
import { inject } from 'inversify'
import { Ingredient } from '../../entities'
import { RecipeService } from '../../services'
import { constants } from '../../util'
import { NotFoundError } from '../../errors'

const { TYPES } = constants

@controller('/v1/ingredients')
export default class IngredientController implements interfaces.Controller {
    @inject(TYPES.RecipeService) private readonly recipeService!: RecipeService

    @httpPost(
        '/',
        ...IngredientController.validate('createIngredient'),
        TYPES.ErrorMiddleware
    )
    public async createIngredient(
        @requestBody() body: { name: string; unit?: string }
    ): Promise<Ingredient> {
        return await this.recipeService.createIngredient(body)
    }

    @httpGet(
        '/:ingredientId',
        ...IngredientController.validate('getIngredient'),
        TYPES.ErrorMiddleware
    )
    public async getIngredient(
        @requestParam('ingredientId') ingredientId: number
    ): Promise<Ingredient> {
        const ingredient = await this.recipeService.getIngredient(ingredientId)
        if (typeof ingredient === 'undefined') {
            throw new NotFoundError('Ingredient was not found')
        }
        return ingredient
    }

    @httpDelete(
        '/:ingredientId',
        ...IngredientController.validate('deleteIngredient'),
        TYPES.ErrorMiddleware
    )
    public async deleteIngredient(
        @requestParam('ingredientId') ingredientId: number
    ): Promise<void> {
        const result = await this.recipeService.deleteIngredient(ingredientId)
        if (!result) {
            throw new NotFoundError('Ingredient was not found')
        }
    }

    private static validate(method: string): ValidationChain[] {
        switch (method) {
            case 'createIngredient':
                return [
                    body('name').exists().isString(),
                    body('unit').optional().isString(),
                ]

            case 'getIngredient':
                return [param('ingredientId').isInt().toInt()]

            case 'deleteIngredient':
                return [param('ingredientId').isInt().toInt()]

            default:
                return []
        }
    }
}
