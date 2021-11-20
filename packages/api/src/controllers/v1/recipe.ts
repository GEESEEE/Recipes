import { ValidationChain, query, body } from 'express-validator'
import {
    controller,
    httpGet,
    httpPut,
    interfaces,
    queryParam,
    request,
    requestBody,
} from 'inversify-express-utils'
import { inject } from 'inversify'
import { Request } from 'express'
import {
    PaginationObject,
    RecipeScopeArgs,
    RecipeScopes,
    RecipeSortOptions,
    ReportType,
    SortQueryTuple,
} from '@recipes/api-types/v1'
import { constants, decodeQueryParams, decodeSortQuery } from '@/utils'
import { RecipeService } from '@/services'
import { RecipeResult, ReportResult } from '@/types'

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
        @queryParam('sort') sort?: SortQueryTuple<RecipeSortOptions>[],
        @queryParam('page') page?: number,
        @queryParam('perPage') perPage?: number
    ): Promise<PaginationObject<RecipeResult>> {
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

        return await this.recipeService.getPaginatedRecipes({
            scopes,
            args,
            sort,
            page,
            perPage,
        })
    }

    @httpPut(
        ':recipeId/report',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('reportRecipe'),
        TYPES.ErrorMiddleware
    )
    public async reportRecipe(
        @request() req: Request,
        @queryParam('recipeId') recipeId: number,
        @requestBody()
        body: {
            category: ReportType
            description: string
        }
    ): Promise<ReportResult> {
        return await this.recipeService.reportRecipe({
            userId: req.user?.id as number,
            recipeId,
            ...body,
        })
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

            case 'reportRecipe':
                return [
                    query('recipeId').isInt().toInt(),
                    body('category').isIn(Object.values(ReportType)),
                    body('description').isString(),
                ]

            default:
                return []
        }
    }
    // #endregion
}
