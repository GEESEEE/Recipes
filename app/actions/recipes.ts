import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch } from 'redux'
import { RECIPE_ACTIONS } from '../reducers/recipes'
import * as recipeService from '../services/recipe'
import { Instruction, Ingredient, Recipe, RecipeIngredient } from '../data'
import { deleteElement, replaceElements } from '../config/utils'

export const createRecipe =
    (recipe: Recipe) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const recipesString = await AsyncStorage.getItem('recipes')
            if (recipesString !== null) {
                const localRecipes: Recipe[] = JSON.parse(recipesString)

                const newRecipe = await recipeService.createRecipe({
                    name: recipe.name,
                    description: recipe.description,
                    peopleCount: recipe.peopleCount,
                    prepareTime: recipe.prepareTime
                })

                // If ingredients were set, put those in database too and set in newRecipe
                if (
                    typeof recipe.recipeIngredients !== 'undefined' &&
                    recipe.recipeIngredients.length > 0
                ) {
                    const ingredientObjects: {
                        name: string
                        amount: number
                        unit?: string
                    }[] = []
                    recipe.recipeIngredients.forEach((ri) => {
                        const i = ri.ingredient as Ingredient
                        ingredientObjects.push({
                            name: i.name,
                            amount: ri.amount,
                            unit: i.unit as string | undefined,
                        })
                    })
                    const ingredients = await recipeService.addIngredients(
                        newRecipe.id,
                        ingredientObjects
                    )
                    newRecipe.recipeIngredients = ingredients
                    // else set ingredients to empty array
                } else {
                    newRecipe.recipeIngredients = []
                }

                // If instructions were set, put those in database too and set in newRecipe
                if (
                    typeof recipe.instructions !== 'undefined' &&
                    recipe.instructions.length > 0
                ) {
                    const instructions = await recipeService.addInstructions(
                        newRecipe.id,
                        recipe.instructions
                    )
                    newRecipe.instructions = instructions
                    // else set instructions to empty array
                } else {
                    newRecipe.instructions = []
                }

                // Add new recipe to local storage
                localRecipes.push(newRecipe)
                await AsyncStorage.setItem(
                    'recipes',
                    JSON.stringify(localRecipes)
                )

                dispatch({
                    type: RECIPE_ACTIONS.ADD_RECIPE,
                    payload: { newRecipe },
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

export const editRecipe =
    (recipe: Recipe) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const recipesString = await AsyncStorage.getItem('recipes')
            if (recipesString !== null) {
                const localRecipes: Recipe[] = JSON.parse(recipesString)

                // Replace in localRecipes
                const localRecipe = localRecipes.filter(r => r.id === recipe.id)[0]
                deleteElement(localRecipes, localRecipe)

                localRecipes.push(recipe)

                // Update recipe itself
                const newRecipe = await recipeService.updateRecipe(
                    recipe.id,
                    {
                        name: recipe.name,
                        description: recipe.description,
                        peopleCount: recipe.peopleCount,
                        prepareTime: recipe.prepareTime
                    },
                )
                newRecipe.recipeIngredients = []
                newRecipe.instructions = localRecipe.instructions

                // Add and update ingredients
                const ingredientsToAdd: RecipeIngredient[] = []
                const ingredientsToUpdate: RecipeIngredient[] = []
                recipe.recipeIngredients!.forEach(ingr => {
                    // If id <= 0 only exists locally, so add to db
                    if (ingr.id <= 0) {
                        ingredientsToAdd.push(ingr)
                        // Else if ingredient has changed, update changes in db
                    } else {
                        localRecipe.recipeIngredients!.forEach(oldIngr => {
                            if (oldIngr.id === ingr!.id
                                    && (oldIngr.amount !== ingr.amount
                                    || oldIngr.ingredient!.name !== ingr.ingredient!.name
                                    || oldIngr.ingredient!.unit !== ingr.ingredient!.unit)) {

                                ingredientsToUpdate.push(ingr)
                            }
                        })
                    }
                })

                if (ingredientsToAdd.length > 0) {
                    const addedIngredients = await recipeService.addIngredients(
                        recipe.id,
                        ingredientsToAdd.map(ri => ({
                            amount: ri.amount,
                            unit: ri.ingredient!.unit ?? undefined,
                            name: ri.ingredient!.name,
                        }))
                    )
                    newRecipe.recipeIngredients!.push(...addedIngredients)
                }

                if (ingredientsToUpdate.length > 0) {
                    // TODO: Keep ingredient order the same
                    newRecipe.recipeIngredients!.push(...ingredientsToUpdate)
                }


                // Add and update instructions
                const instructionsToAdd: Instruction[] = []
                const instructionsToUpdate: Instruction[] = []
                recipe.instructions!.forEach(ins => {
                    // If id <= 0, only exists locally, so add to recipe in db
                    if (ins.id <= 0) {
                        instructionsToAdd.push(ins)
                        // Else if instruction has changed, update changes in db
                    } else {
                        localRecipe.instructions!.forEach(oldIns => {
                            if (oldIns.id === ins.id
                                && (oldIns.text !== ins.text)) {

                                instructionsToUpdate.push(ins)
                            }
                        })
                    }
                })

                if (instructionsToAdd.length > 0) {
                    const addedInstructions = await recipeService.addInstructions(
                        recipe.id,
                        instructionsToAdd.map(i => ({ text: i.text }))
                    )
                    newRecipe.instructions!.push(...addedInstructions)
                }

                if (instructionsToUpdate.length > 0) {
                    const updatedInstructions = await recipeService.updateInstructions(
                        recipe.id,
                        instructionsToUpdate.map(i => ({ text: i.text, instructionId: i.id}))
                    )
                    console.log("Updated instructions:", updatedInstructions)
                    // TODO: Keep instruction order the same
                    newRecipe.instructions = replaceElements(newRecipe.instructions!, instructionsToUpdate)
                }

                dispatch({
                    type: RECIPE_ACTIONS.EDIT_RECIPE,
                    payload: { newRecipe }
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

export const retrieveRecipes =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            // Check local storage for recipes
            let rs = await AsyncStorage.getItem('recipes')
            if (rs === null) {
                await AsyncStorage.setItem('recipes', '[]')
                rs = '[]'
            }
            const recipes: Recipe[] = JSON.parse(rs)

            // Put recipes without a database id into the database
            const localRecipes = recipes.filter((recipe) => recipe.id <= 0)
            if (localRecipes.length > 0) {
                await recipeService.createRecipes(localRecipes)
            }

            // Get all my recipes from database
            const newRecipes = await recipeService.getMyRecipes()

            await AsyncStorage.setItem('recipes', JSON.stringify(recipes))
            dispatch({
                type: RECIPE_ACTIONS.SET_RECIPES,
                payload: { newRecipes },
            })
        } catch (err) {
            console.error(err)
        }
    }

export const deleteRecipe =
    (recipe: Recipe) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const rs = (await AsyncStorage.getItem('recipes')) as string
            const localRecipes: Recipe[] = JSON.parse(rs)

            deleteElement(localRecipes, recipe)

            await recipeService.deleteRecipe(recipe.id)
            dispatch({
                type: RECIPE_ACTIONS.DELETE_RECIPE,
                payload: { recipe },
            })
        } catch (err) {
            console.error(err)
        }
    }
