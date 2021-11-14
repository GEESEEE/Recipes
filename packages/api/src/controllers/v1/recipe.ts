import { ValidationChain, query } from 'express-validator'
import {
    controller,
    httpGet,
    interfaces,
    queryParam,
} from 'inversify-express-utils'

import { inject } from 'inversify'
import {
    constants,
    decodeQueryParams,
    decodeSortQuery,
    SortQueryTuple,
} from '@/utils'
import { RecipeService } from '@/services'
import { RecipeResult, RecipeScopeArgs, RecipeScopes } from '@/types'

const { TYPES } = constants

@controller('/v1/recipes')
export default class RecipeController implements interfaces.Controller {
    @inject(TYPES.RecipeService)
    private readonly recipeService!: RecipeService

    @httpGet(
        '/',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('getRecipes'),
        TYPES.ErrorMiddleware
    )
    public async getRecipes(
        @queryParam('scopes') scopes?: RecipeScopes[],
        @queryParam('search') search?: string[],
        @queryParam('sort') sort?: SortQueryTuple[]
    ): Promise<RecipeResult[]> {
        if (typeof scopes === 'undefined') {
            scopes = []
        }

        // Only allowed to query published recipes through this route
        if (!scopes.includes('published')) {
            scopes.push('published')
        }

        const args: RecipeScopeArgs = {}

        if (typeof search !== 'undefined') {
            scopes.push('search')
            args.searchQuery = search
        }

        if (typeof sort === 'undefined') {
            sort = []
        }

        return await this.recipeService.getRecipes(scopes, args, sort)
    }

    // #region validate
    private static validate(method: string): ValidationChain[] {
        switch (method) {
            case 'getRecipes':
                return [
                    query('scopes').customSanitizer(decodeQueryParams),
                    query('sort').customSanitizer(decodeSortQuery),
                    query('search').customSanitizer(decodeQueryParams),
                ]

            default:
                return []
        }
    }
    // #endregion
}
