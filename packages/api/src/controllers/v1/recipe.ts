import { ValidationChain } from 'express-validator'
import {
    controller,
    httpGet,
    interfaces,
    request,
    requestParam,
} from 'inversify-express-utils'
import { Request } from 'express'
import { inject } from 'inversify'

import { constants } from '@/utils'
import { RecipeService } from '@/services'
import { RecipeResult } from '@/types'

const { TYPES } = constants

@controller('/v1/sections/:sectionId/recipes')
export default class RecipeController implements interfaces.Controller {
    @inject(TYPES.RecipeService)
    private readonly recipeService!: RecipeService

    @httpGet(
        '/',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('getRecipesBySectionId'),
        TYPES.ErrorMiddleware,
        TYPES.PaginationMiddleware
    )
    public async getSectionsBySectionId(
        @request() req: Request,
        @requestParam('sectionId') sectionId: number
    ): Promise<RecipeResult> {
        console.log('Getting recipes by sectionid', sectionId, req.user?.name)
        const recipes = await this.recipeService.getRecipesByScopes(
            ['section'],
            { sectionId },
            []
        )
        console.log('Recipes', recipes)
        return recipes.data
    }

    // #region validate
    private static validate(method: string): ValidationChain[] {
        switch (method) {
            case 'getRecipesBySectionId':
                return []

            default:
                return []
        }
    }
    // #endregion
}
