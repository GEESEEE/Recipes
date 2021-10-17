import { ValidationChain, body, param, query } from 'express-validator'
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    interfaces,
    queryParam,
    request,
    requestBody,
    requestParam,
} from 'inversify-express-utils'
import { Request } from 'express'
import { inject } from 'inversify'
import { RecipeService } from '../../services'
import { constants } from '../../util'
import { Instruction, Recipe, RecipeIngredient } from '../../entities'
import { NotFoundError, ForbiddenError } from '../../errors'
import { UserAbility } from '../../abilities'
import {
    decodeQueryParams,
    decodeSortQuery,
    SortQueryTuple,
} from '../../util/request'
import { RecipeScopeArgs } from '../../repositories/recipe'
import { PaginationObject } from '../../repositories/base'
import { ModifyError, methodMap } from './base'

const { TYPES } = constants

const recipeProperties = ['ingredient', 'instruction']

@controller('/v1/recipes')
export default class RecipeController implements interfaces.Controller {
    @inject(TYPES.RecipeService) private readonly recipeService!: RecipeService

    // #region Recipe
    private async checkRecipeAbility(
        req: Request,
        recipeId: number
    ): Promise<Recipe> {
        const ability = req.user?.ability as UserAbility
        const action = methodMap[req.method]

        const recipe = await this.recipeService.getRecipe(recipeId)
        if (typeof recipe === 'undefined') {
            throw new NotFoundError('Recipe not found')
        }

        if (!ability.can(action, recipe)) {
            let actionString = action
            for (const prop of recipeProperties) {
                if (req.path.includes(prop)) {
                    actionString += ` ${prop}s`
                    if (action === 'read') {
                        actionString += ' for'
                    } else {
                        actionString += ' of'
                    }
                }
            }

            actionString += ' a'
            if (action === 'read') actionString += 'n unpublished'
            throw new ForbiddenError(
                `Unauthorized to ${actionString} recipe from someone else`
            )
        }
        return recipe
    }

    @httpPost(
        '/',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('createRecipe'),
        TYPES.ErrorMiddleware
    )
    public async createRecipe(
        @request() req: Request,
        @requestBody()
        body: {
            name: string
            description: string
            prepareTime: number
            peopleCount: number
            publishedAt?: Date | null
            createdAt?: Date
            copyOf?: number | null
        }
    ): Promise<Recipe> {
        const recipe: any = {
            name: body.name,
            description: body.description,
            prepareTime: body.prepareTime,
            peopleCount: body.peopleCount,
            authorId: req.user?.id,
        }
        if (typeof body.publishedAt !== 'undefined') {
            recipe.publishedAt = body.publishedAt
        }
        if (typeof body.createdAt !== 'undefined') {
            recipe.createdAt = body.createdAt
        }
        if (typeof body.copyOf !== 'undefined') {
            recipe.copyOf = body.copyOf
        }
        return (await this.recipeService.createRecipes([recipe]))[0]
    }

    @httpPost(
        '/bulk',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('createRecipes'),
        TYPES.ErrorMiddleware
    )
    public async createRecipes(
        @request() req: Request,
        @requestBody()
        body: Array<{
            name: string
            description: string
            prepareTime: number
            peopleCount: number
            publishedAt?: Date | null
            createdAt?: Date
            copyOf?: number | null
        }>
    ): Promise<Recipe[]> {
        const recipes = body.map((b) => {
            const r: any = {
                name: b.name,
                description: b.description,
                prepareTime: b.prepareTime,
                peopleCount: b.peopleCount,
                authorId: req.user?.id as number,
            }
            if (typeof b.publishedAt !== 'undefined') {
                r.publishedAt = b.publishedAt
            }
            if (typeof b.createdAt !== 'undefined') {
                r.createdAt = b.createdAt
            }
            if (typeof b.copyOf !== 'undefined') {
                r.copyOf = b.copyOf
            }
            return r
        })
        return await this.recipeService.createRecipes(recipes)
    }

    @httpGet(
        '/:recipeId',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('getRecipe'),
        TYPES.AbilityMiddleware,
        TYPES.ErrorMiddleware
    )
    public async getRecipe(
        @request() req: Request,
        @requestParam('recipeId') recipeId: number
    ): Promise<Recipe> {
        const recipe = await this.checkRecipeAbility(req, recipeId)
        return recipe
    }

    @httpGet(
        '/',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('getRecipes'),
        TYPES.ErrorMiddleware,
        TYPES.PaginationMiddleware
    )
    public async getRecipes(
        @request() req: Request,
        @requestBody()
        body: {
            authorId?: number
        },
        @queryParam('scopes') scopes?: string[],
        @queryParam('search') search?: string[],
        @queryParam('sort') sort?: SortQueryTuple[]
    ): Promise<PaginationObject> {
        if (typeof scopes === 'undefined') {
            scopes = []
        }

        // If scope has author, but no authorId was provided, use the requesting user's id
        if (scopes.includes('author') && typeof body.authorId === 'undefined') {
            body.authorId = req.user?.id as number
        }

        const args: RecipeScopeArgs = body

        if (typeof search !== 'undefined') {
            scopes.push('search')
            args.searchQuery = search
        }

        if (typeof sort === 'undefined') {
            sort = []
        }

        return await this.recipeService.getRecipesByScopes(scopes, args, sort)
    }

    @httpPut(
        '/:recipeId',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('updateRecipe'),
        TYPES.AbilityMiddleware,
        TYPES.ErrorMiddleware
    )
    public async updateRecipe(
        @request() req: Request,
        @requestParam('recipeId') recipeId: number,
        @requestBody()
        body: {
            name?: string
            description?: string
            prepareTime?: number
            peopleCount?: number
            publishedAt?: Date | null
        }
    ): Promise<Recipe> {
        const recipe = await this.checkRecipeAbility(req, recipeId)
        return await this.recipeService.updateRecipe(recipe, body)
    }

    @httpDelete(
        '/:recipeId',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('deleteRecipe'),
        TYPES.AbilityMiddleware,
        TYPES.ErrorMiddleware
    )
    public async deleteRecipe(
        @request() req: Request,
        @requestParam('recipeId') recipeId: number
    ): Promise<void> {
        await this.checkRecipeAbility(req, recipeId)
        await this.recipeService.deleteRecipe(recipeId)
    }

    // #endregion

    // #region Ingredients
    @httpPost(
        '/:recipeId/ingredients/bulk',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('addIngredients'),
        TYPES.AbilityMiddleware,
        TYPES.ErrorMiddleware
    )
    public async addIngredients(
        @request() req: Request,
        @requestParam('recipeId') recipeId: number,
        @requestBody()
        body: Array<{
            amount: number
            position: number
            name: string
            unit: string | null
        }>
    ): Promise<RecipeIngredient[]> {
        await this.checkRecipeAbility(req, recipeId)
        return await this.recipeService.addRecipeIngredients(recipeId, body)
    }

    @httpPut(
        '/:recipeId/ingredients/bulk',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('updateIngredients'),
        TYPES.AbilityMiddleware,
        TYPES.ErrorMiddleware
    )
    public async updateIngredients(
        @request() req: Request,
        @requestParam('recipeId') recipeId: number,
        @requestBody()
        body: Array<{
            recipeIngredientId: number
            amount?: number
            position?: number
            name?: string
            unit?: string
        }>
    ): Promise<Array<RecipeIngredient | ModifyError>> {
        const recipe = await this.checkRecipeAbility(req, recipeId)
        const res: Array<RecipeIngredient | ModifyError> = []
        const toUpdate = []

        for (const iToUpdate of body) {
            const existIngr = recipe.recipeIngredients?.find(
                (i) => i.id === iToUpdate.recipeIngredientId
            )
            if (typeof existIngr !== 'undefined') {
                toUpdate.push(iToUpdate)
            } else {
                res.push({
                    id: iToUpdate.recipeIngredientId,
                    statusCode: 403,
                    statusMessage:
                        'Provided recipeId does not match that of this recipe ingredient',
                })
            }
        }

        if (toUpdate.length > 0) {
            res.push(
                ...(await this.recipeService.updateRecipeIngredients(toUpdate))
            )
        }

        return res
    }

    @httpDelete(
        '/:recipeId/ingredients/bulk',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('removeIngredients'),
        TYPES.AbilityMiddleware,
        TYPES.ErrorMiddleware
    )
    public async removeIngredients(
        @request() req: Request,
        @requestParam('recipeId') recipeId: number,
        @requestBody() body: number[]
    ): Promise<ModifyError[]> {
        const recipe = await this.checkRecipeAbility(req, recipeId)
        const toDelete = []
        const errors: ModifyError[] = []
        if (typeof recipe.recipeIngredients === 'undefined')
            recipe.recipeIngredients = []

        for (const recipeIngredient of recipe.recipeIngredients) {
            if (
                typeof recipeIngredient.ingredient !== 'undefined' &&
                body.includes(recipeIngredient.ingredient.id)
            ) {
                toDelete.push(recipeIngredient.ingredient.id)
            } else {
                errors.push({
                    id: recipeIngredient.id,
                    statusCode: 403,
                    statusMessage:
                        'Provided recipeId does not match that of this recipe ingredient',
                })
            }
        }

        if (toDelete.length > 0) {
            await this.recipeService.removeRecipeIngredients(recipeId, toDelete)
        }
        return errors
    }
    // #endregion

    // #region Instructions
    @httpPost(
        '/:recipeId/instructions/bulk',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('addInstructions'),
        TYPES.AbilityMiddleware,
        TYPES.ErrorMiddleware
    )
    public async addInstructions(
        @request() req: Request,
        @requestParam('recipeId') recipeId: number,
        @requestBody() body: Array<{ text: string; position: number }>
    ): Promise<Instruction[]> {
        await this.checkRecipeAbility(req, recipeId)
        return await this.recipeService.addInstructions(recipeId, body)
    }

    @httpPut(
        '/:recipeId/instructions/bulk',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('updateInstructions'),
        TYPES.AbilityMiddleware,
        TYPES.ErrorMiddleware
    )
    public async updateInstructions(
        @request() req: Request,
        @requestParam('recipeId') recipeId: number,
        @requestBody()
        body: Array<{ instructionId: number; text?: string; position?: number }>
    ): Promise<Array<Instruction | ModifyError>> {
        const recipe = await this.checkRecipeAbility(req, recipeId)
        const res: Array<Instruction | ModifyError> = []
        const toUpdate = []

        for (const iToUpdate of body) {
            const existInstr = recipe.instructions?.find(
                (i) => i.id === iToUpdate.instructionId
            )
            if (typeof existInstr !== 'undefined') {
                toUpdate.push(iToUpdate)
            } else {
                res.push({
                    id: iToUpdate.instructionId,
                    statusCode: 403,
                    statusMessage:
                        'Provided recipeId does not match that of this instruction',
                })
            }
        }

        if (toUpdate.length > 0) {
            res.push(...(await this.recipeService.updateInstructions(toUpdate)))
        }
        return res
    }

    @httpDelete(
        '/:recipeId/instructions/bulk',
        TYPES.PassportMiddleware,
        ...RecipeController.validate('deleteInstructions'),
        TYPES.AbilityMiddleware,
        TYPES.ErrorMiddleware
    )
    public async deleteInstructions(
        @request() req: Request,
        @requestParam('recipeId') recipeId: number,
        @requestBody() body: number[]
    ): Promise<ModifyError[]> {
        const recipe = await this.checkRecipeAbility(req, recipeId)
        const toDelete = []
        const errors: ModifyError[] = []
        if (typeof recipe.instructions === 'undefined') recipe.instructions = []

        for (const instruction of recipe.instructions) {
            if (body.includes(instruction.id)) {
                toDelete.push(instruction.id)
            } else {
                errors.push({
                    id: instruction.id,
                    statusCode: 403,
                    statusMessage:
                        'Provided recipeId does not match that of this instruction',
                })
            }
        }
        if (toDelete.length > 0) {
            await this.recipeService.deleteInstructions(toDelete)
        }
        return errors
    }
    // #endregion

    // #region validate
    private static validate(method: string): ValidationChain[] {
        switch (method) {
            case 'createRecipes':
                return [
                    body().isArray(),
                    body('*.name').exists().isString(),
                    body('*.description').exists().isString(),
                    body('*.prepareTime').isInt().toInt(),
                    body('*.peopleCount').isInt().toInt(),
                ]

            case 'createRecipe':
                return [
                    body('name').exists().isString(),
                    body('description').exists().isString(),
                    body('prepareTime').isInt().toInt(),
                    body('peopleCount').isInt().toInt(),
                ]

            case 'deleteRecipe':
                return [param('recipeId').isInt().toInt()]

            case 'getRecipe':
                return [param('recipeId').isInt().toInt()]

            case 'getRecipes':
                return [
                    body('authorId').optional().isString(),
                    query('scopes').customSanitizer(decodeQueryParams),
                    query('sort').customSanitizer(decodeSortQuery),
                    query('search').customSanitizer(decodeQueryParams),
                ]

            case 'updateRecipe':
                return [
                    param('recipeId').isInt().toInt(),
                    body('name').optional().isString(),
                    body('description').optional().isString(),
                    body('prepareTime').optional().isInt().toInt(),
                    body('peopleCount').optional().isInt().toInt(),
                ]

            case 'addIngredients':
                return [
                    param('recipeId').isInt().toInt(),
                    body().isArray(),
                    body('*.name').exists().isString(),
                    body('*.position').isInt().toInt(),
                    body('*.amount').isFloat().toFloat(),
                    body('*.unit')
                        .isString()
                        .optional({ nullable: true, checkFalsy: false }),
                ]

            case 'removeIngredients':
                return [
                    param('recipeId').isInt().toInt(),
                    body().isArray(),
                    body('*').isInt().toInt(),
                ]

            case 'updateIngredients':
                return [
                    param('recipeId').isInt().toInt(),
                    body().isArray(),
                    body('*.recipeIngredientId').isInt().toInt(),
                    body('*.amount').optional().isFloat().toFloat(),
                    body('*.position').optional().isInt().toInt(),
                    body('*.name').optional().isString(),
                    body('*.unit').optional({ nullable: true }).isString(),
                ]

            case 'addInstructions':
                return [
                    param('recipeId').isInt().toInt(),
                    body().isArray(),
                    body('*.text').exists().isString(),
                    body('*.position').isInt().toInt(),
                ]

            case 'deleteInstructions':
                return [body().isArray(), param('*').isInt().toInt()]

            case 'updateInstructions':
                return [
                    param('recipeId').isInt().toInt(),
                    body().isArray(),
                    body('*.instructionId').isInt().toInt(),
                    body('*.text').exists().isString(),
                    body('*.position').optional().isInt().toInt(),
                ]
            default:
                return []
        }
    }
    // #endregion
}
