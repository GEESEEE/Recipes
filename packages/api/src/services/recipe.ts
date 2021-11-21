import { inject, injectable } from 'inversify'
import { In, Repository } from 'typeorm'
import {
    fitToClass,
    RecipeCreate,
    RecipeUpdate,
    IngredientCreate,
    RecipeIngredientCreate,
    RecipeIngredientUpdate,
    InstructionCreate,
    InstructionUpdate,
    RecipeSortOptions,
    RecipeScopes,
    RecipeScopeArgs,
    PaginationObject,
    ScopeParams,
    PaginationParams,
    ReportCreate,
} from '@recipes/api-types/v1'
import { TYPES } from '@/utils/constants'
import { RecipeQueryBuilder, RecipeRepository } from '@/repositories'
import {
    InstructionResult,
    RecipeIngredientResult,
    RecipeResult,
    ReportResult,
} from '@/types'
import {
    Ingredient,
    Instruction,
    Recipe,
    RecipeIngredient,
    Report,
} from '@/entities'

type RecipeScopeParams = ScopeParams<
    RecipeScopes,
    RecipeScopeArgs,
    RecipeSortOptions,
    false
>

@injectable()
export default class RecipeService {
    @inject(TYPES.RecipeRepository)
    private readonly recipeRepository!: RecipeRepository

    @inject(TYPES.IngredientRepository)
    private readonly ingredientRepository!: Repository<Ingredient>

    @inject(TYPES.RecipeIngredientRepository)
    private readonly recipeIngredientRepository!: Repository<RecipeIngredient>

    @inject(TYPES.InstructionRepository)
    private readonly instructionRepository!: Repository<Instruction>

    @inject(TYPES.ReportRepository)
    private readonly reportRepository!: Repository<Report>

    // #region Recipe
    public async createRecipes(
        recipes: Array<RecipeCreate>
    ): Promise<RecipeResult[]> {
        const rs = recipes.map((recipe) => this.recipeRepository.create(recipe))
        const saved = await this.recipeRepository.save(rs)
        return saved.map((r) => fitToClass(r as RecipeResult, RecipeResult))
    }

    public async getRecipesBase({
        scopes,
        args,
        sort,
    }: RecipeScopeParams): Promise<RecipeQueryBuilder> {
        let qb = this.recipeRepository.queryBuilder(args)
        qb = qb.validate({ scopes, sort })
        qb = qb.finish()
        return qb
    }

    public async getRecipes(
        params: RecipeScopeParams
    ): Promise<RecipeResult[]> {
        const qb = await this.getRecipesBase(params)
        const recipes = await qb.getMany()

        return recipes.map((recipe) =>
            fitToClass(recipe as RecipeResult, RecipeResult)
        )
    }

    public async getPaginatedRecipes(
        params: RecipeScopeParams & PaginationParams
    ): Promise<PaginationObject<RecipeResult>> {
        const qb = await this.getRecipesBase(params)
        const paginated = await qb.paginate(params.page, params.perPage)

        paginated.data.map((recipe: Recipe) =>
            fitToClass(recipe as RecipeResult, RecipeResult)
        )
        return paginated
    }

    public async updateRecipes(
        recipes: Array<RecipeUpdate>
    ): Promise<RecipeResult[]> {
        const finalRecipes = recipes.map(async (recipe) => {
            if (
                typeof recipe.sectionId !== 'undefined' &&
                recipe.sectionId !== null
            ) {
                const maxPos = await this.recipeRepository
                    .queryBuilder()
                    .getMaxRecipePosition(recipe.sectionId)

                recipe.position = maxPos + 1
            }
            return recipe
        })

        const saved = await this.recipeRepository.save(
            await Promise.all(finalRecipes)
        )
        return saved.map((recipe) =>
            fitToClass(recipe as RecipeResult, RecipeResult)
        )
    }

    public async deleteRecipe(recipeId: number): Promise<boolean> {
        const isCopied = await this.recipeRepository
            .queryBuilder()
            .isCopied(recipeId)

        if (isCopied) {
            await this.recipeRepository.update(recipeId, {
                sectionId: null,
                publishedAt: null,
            })
            return true
        } else {
            const result = await this.recipeRepository.delete(recipeId)
            return result.affected !== 0
        }
    }

    public async addIngredients(
        ingredients: Array<IngredientCreate>
    ): Promise<Ingredient[]> {
        const existingIngredients = await this.ingredientRepository.find({
            where: ingredients.map((ingr) => ({
                name: ingr.name,
                unit: ingr.unit,
            })),
        })

        // Filter out the ingredients which already exist
        const ingredientsToCreate = ingredients.filter((ingr) => {
            for (const existIngr of existingIngredients) {
                if (
                    existIngr.name === ingr.name &&
                    existIngr.unit === ingr.unit
                )
                    return false
            }
            return true
        })

        // If some ingredients do not exist yet, create them
        let newIngredients: Ingredient[] = []
        if (ingredientsToCreate.length > 0) {
            newIngredients = await this.ingredientRepository.save(
                ingredientsToCreate
            )
        }
        existingIngredients.push(...newIngredients)

        return existingIngredients
    }

    public async addRecipeIngredients(
        recipeId: number,
        ingredients: Array<RecipeIngredientCreate>
    ): Promise<RecipeIngredientResult[]> {
        const existingIngredients = await this.addIngredients(
            ingredients.map((i) => ({ unit: i.unit, name: i.name }))
        )

        const recipeIngredientObjects = existingIngredients.map(
            (ingredient, index) => {
                return this.recipeIngredientRepository.create({
                    recipeId,
                    ingredient,
                    amount: ingredients[index].amount,
                    position: ingredients[index].position,
                })
            }
        )

        const recipeIngredients = await this.recipeIngredientRepository.save(
            recipeIngredientObjects
        )
        return recipeIngredients.map((ingr) =>
            fitToClass(ingr as RecipeIngredientResult, RecipeIngredientResult)
        )
    }

    public async updateRecipeIngredients(
        recipeIngredients: Array<RecipeIngredientUpdate>
    ): Promise<RecipeIngredientResult[]> {
        const existingRecipeIngredients =
            await this.recipeIngredientRepository.find({
                where: {
                    id: In(recipeIngredients.map((ri) => ri.id)),
                },
                relations: ['ingredient'],
            })

        const ingredientUpdateObjects: {
            [key: number]: IngredientCreate
        } = {}
        recipeIngredients.forEach((ri) => {
            if (
                typeof ri.name !== 'undefined' ||
                typeof ri.unit !== 'undefined'
            ) {
                const existRi = existingRecipeIngredients.find(
                    (exRi) => exRi.id === ri.id
                )
                if (
                    typeof existRi !== 'undefined' &&
                    typeof existRi.ingredient !== 'undefined'
                ) {
                    ingredientUpdateObjects[ri.id] = {
                        name: ri.name ?? existRi.ingredient.name,
                        unit: ri.unit ?? existRi.ingredient.unit,
                    }
                }
            }
        })

        const updatedIngredients = await this.addIngredients(
            Object.values(ingredientUpdateObjects)
        )

        const recipeIngredientsToSave = existingRecipeIngredients.map((ri) => {
            // If ingredient was changed for this recipeIngredient, set it
            const updateObject = ingredientUpdateObjects[ri.id]
            if (typeof updateObject !== 'undefined') {
                const ingredient = updatedIngredients.find(
                    (i) =>
                        i.name === updateObject.name &&
                        i.unit === updateObject.unit
                )
                if (typeof ingredient !== 'undefined') {
                    ri.ingredient = ingredient
                    ri.ingredientId = ingredient.id
                }
            }
            // If amount or position were given, set to recipeIngredient
            const recipeIngredient = recipeIngredients.find(
                (i) => i.id === ri.id
            )
            if (typeof recipeIngredient !== 'undefined') {
                if (typeof recipeIngredient.amount !== 'undefined')
                    ri.amount = recipeIngredient.amount
                if (typeof recipeIngredient.position !== 'undefined')
                    ri.position = recipeIngredient.position
            }
            return ri
        })
        const newRecipeIngredients = await this.recipeIngredientRepository.save(
            recipeIngredientsToSave
        )
        return newRecipeIngredients.map((ingr) =>
            fitToClass(ingr as RecipeIngredientResult, RecipeIngredientResult)
        )
    }

    public async removeRecipeIngredients(
        recipeId: number,
        ingredientIds: number[]
    ): Promise<number> {
        const result = await this.recipeIngredientRepository.delete({
            recipeId,
            id: In(ingredientIds),
        })

        return result.affected || 0
    }

    // #endregion

    // #region Instruction

    public async addInstructions(
        recipeId: number,
        instructions: Array<InstructionCreate>
    ): Promise<InstructionResult[]> {
        const instructionObjects = instructions.map((instruction) =>
            this.instructionRepository.create({
                recipeId,
                text: instruction.text,
                position: instruction.position,
            })
        )
        const newInstructions = await this.instructionRepository.save(
            instructionObjects
        )
        return newInstructions.map((instruction) =>
            fitToClass(instruction, InstructionResult)
        )
    }

    public async deleteInstructions(instructionIds: number[]): Promise<number> {
        const result = await this.instructionRepository.delete(instructionIds)
        return result.affected || 0
    }

    public async updateInstructions(
        instructions: Array<InstructionUpdate>
    ): Promise<InstructionResult[]> {
        const res = await this.instructionRepository.save(instructions)
        return res.map((instr) => fitToClass(instr, InstructionResult))
    }

    // #endregion
}
