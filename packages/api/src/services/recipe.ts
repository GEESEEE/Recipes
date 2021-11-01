import { inject, injectable } from 'inversify'
import { In, Repository } from 'typeorm'
import { fitToClass, RecipeCreate, RecipeUpdate } from '@recipes/api-types/v1'
import { TYPES } from '@/utils/constants'
import { IngredientRepository, RecipeRepository } from '@/repositories'
import { SortQueryTuple } from '@/utils/request'
import { RecipeResult, RecipeScopeArgs, RecipeScopes } from '@/types'
import { Ingredient, Instruction, Recipe, RecipeIngredient } from '@/entities'

@injectable()
export default class RecipeService {
    @inject(TYPES.RecipeRepository)
    private readonly recipeRepository!: RecipeRepository

    @inject(TYPES.IngredientRepository)
    private readonly ingredientRepository!: IngredientRepository

    @inject(TYPES.RecipeIngredientRepository)
    private readonly recipeIngredientRepository!: Repository<RecipeIngredient>

    @inject(TYPES.InstructionRepository)
    private readonly instructionRepository!: Repository<Instruction>

    // #region ingredient
    public async createIngredient({
        name,
        unit,
    }: {
        name: string
        unit?: string
    }): Promise<Ingredient> {
        let ingredient = await this.ingredientRepository.findOne({
            where: { name, unit },
        })

        if (typeof ingredient === 'undefined') {
            ingredient = await this.ingredientRepository.save({
                name,
                unit,
            })
        }

        return ingredient
    }

    public async deleteIngredient(ingredientId: number): Promise<boolean> {
        const result = await this.ingredientRepository.delete(ingredientId)
        return result.affected !== 0
    }

    public async getIngredient(
        ingredientId: number
    ): Promise<Ingredient | undefined> {
        const ingredient = await this.ingredientRepository.findOne({
            where: { id: ingredientId },
        })
        return ingredient
    }
    // #endregion

    // #region Recipe
    public async createRecipes(
        recipes: Array<RecipeCreate>
    ): Promise<RecipeResult[]> {
        const rs = recipes.map((recipe) => this.recipeRepository.create(recipe))
        const recipe = await this.recipeRepository.save(rs)
        return recipe.map((r) => fitToClass(r as RecipeResult, RecipeResult))
    }

    // TODO: Remove, because recipescopes can do the same thing
    public async getRecipe(recipeId: number): Promise<Recipe | undefined> {
        return (
            await this.recipeRepository
                .queryBuilder()
                .byId(recipeId)
                .finish()
                .getMany()
        )[0]
    }

    public async getRecipesByScopes(
        scopes: RecipeScopes[],
        args: RecipeScopeArgs,
        sort: SortQueryTuple[]
    ): Promise<RecipeResult[]> {
        let qb = this.recipeRepository.queryBuilder(args)

        qb = qb.validate({ scopes, sort })

        const recipes = await qb.finish().getMany()

        return recipes.map((recipe) =>
            fitToClass(recipe as RecipeResult, RecipeResult)
        )
    }

    public async updateRecipes(
        recipes: Array<RecipeUpdate>
    ): Promise<RecipeResult[]> {
        const saved = await this.recipeRepository.save(recipes)
        return saved.map((recipe) =>
            fitToClass(recipe as RecipeResult, RecipeResult)
        )
    }

    public async deleteRecipe(recipeId: number): Promise<boolean> {
        const result = await this.recipeRepository.delete(recipeId)
        await this.ingredientRepository.queryBuilder.deleteOrphanIngredients()
        return result.affected !== 0
    }

    public async addIngredients(
        ingredients: Array<{ name: string; unit: string | null }>
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
        ingredients: Array<{
            amount: number
            position: number
            name: string
            unit: string | null
        }>
    ): Promise<RecipeIngredient[]> {
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

        return await this.recipeIngredientRepository.save(
            recipeIngredientObjects
        )
    }

    public async updateRecipeIngredients(
        recipeIngredients: Array<{
            recipeIngredientId: number
            amount?: number
            position?: number
            name?: string
            unit?: string
        }>
    ): Promise<RecipeIngredient[]> {
        const existingRecipeIngredients =
            await this.recipeIngredientRepository.find({
                where: {
                    id: In(
                        recipeIngredients.map((ri) => ri.recipeIngredientId)
                    ),
                },
                relations: ['ingredient'],
            })

        const ingredientUpdateObjects: {
            [key: number]: { name: string; unit: string | null }
        } = {}
        recipeIngredients.forEach((ri) => {
            if (
                typeof ri.name !== 'undefined' ||
                typeof ri.unit !== 'undefined'
            ) {
                const existRi = existingRecipeIngredients.find(
                    (exRi) => exRi.id === ri.recipeIngredientId
                )
                if (
                    typeof existRi !== 'undefined' &&
                    typeof existRi.ingredient !== 'undefined'
                ) {
                    ingredientUpdateObjects[ri.recipeIngredientId] = {
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
                (i) => i.recipeIngredientId === ri.id
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
        await this.ingredientRepository.queryBuilder.deleteOrphanIngredients()
        return newRecipeIngredients
    }

    public async removeRecipeIngredients(
        recipeId: number,
        ingredientIds: number[]
    ): Promise<void> {
        await this.recipeIngredientRepository.delete({
            recipeId,
            ingredientId: In(ingredientIds),
        })

        await this.ingredientRepository.queryBuilder.deleteOrphanIngredients()
    }

    // #endregion

    // #region Instruction

    public async addInstructions(
        recipeId: number,
        instructions: Array<{ text: string; position: number }>
    ): Promise<Instruction[]> {
        const instructionObjects = instructions.map((instruction) =>
            this.instructionRepository.create({
                recipeId,
                text: instruction.text,
                position: instruction.position,
            })
        )
        return await this.instructionRepository.save(instructionObjects)
    }

    public async deleteInstructions(instructionIds: number[]): Promise<number> {
        const result = await this.instructionRepository.delete(instructionIds)
        return result.affected || 0
    }

    public async getInstructions(recipeId: number): Promise<Instruction[]> {
        const instructions = await this.instructionRepository.find({
            where: { recipeId },
        })
        return instructions
    }

    public async updateInstructions(
        instructions: Array<{
            instructionId: number
            text?: string
            position?: number
        }>
    ): Promise<Instruction[]> {
        const res = await this.instructionRepository.save(
            instructions.map((i) => ({
                id: i.instructionId,
                text: i.text,
                position: i.position,
            }))
        )
        return res
    }

    // #endregion
}
