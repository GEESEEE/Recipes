import { ValidationChain, query, body } from 'express-validator'
import {
    controller,
    httpGet,
    interfaces,
    queryParam,
    request,
    requestBody,
} from 'inversify-express-utils'
import { inject } from 'inversify'
import { Request } from 'express'
import {
    RecipeScopeArgs,
    RecipeScopes,
    RecipeSortOptions,
    Sort,
} from '@recipes/api-types/v1'
import {
    constants,
    decodeQueryParams,
    decodeSortQuery,
    SortQueryTuple,
} from '@/utils'
import { RecipeService } from '@/services'
import { RecipeResult } from '@/types'

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
        @request() req: Request,
        @requestBody() body: RecipeScopeArgs,
        @queryParam('scopes') scopes?: RecipeScopes[],
        @queryParam('search') search?: string[],
        @queryParam('sort') sort?: SortQueryTuple<RecipeSortOptions>[]
    ): Promise<RecipeResult[]> {
        if (typeof scopes === 'undefined') {
            scopes = []
        }

        const args = body

        // If not looking for published recipes, only return recipes where requesting user is the author
        if (!scopes.includes('published')) {
            if (!scopes.includes('author')) {
                scopes.push('author')
            }
            args.authorId = req.user?.id as number
        }

        if (typeof search !== 'undefined') {
            if (!scopes.includes('search')) {
                scopes.push('search')
            }
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
                    body('recipeIds')
                        .optional()
                        .isArray()
                        .toArray()
                        .custom((arr) => {
                            return arr.every(
                                (val: any) => typeof val === 'number'
                            )
                        }),
                    body('authorId').optional().isInt().toInt(),
                    body('sectionId').optional().isInt().toInt(),
                    body('sectionQuery').optional().isString(),
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
