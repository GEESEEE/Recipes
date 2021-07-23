import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch } from 'redux'
import * as lodash from 'lodash'
import Recipe from '../data/recipe'
import { RECIPEACTIONS } from '../reducers/recipes'
import * as recipeService from '../services/recipe'

async function storeRecipes(recipes: Recipe[]): Promise<Recipe[]> {
    try {
        await AsyncStorage.setItem('recipes', JSON.stringify(recipes))
    } catch (err) {
        console.error(err)
    }
    return recipes
}

export const createRecipe =
    (recipe: {
        name: string
        description: string
        prepareTime: number
        peopleCount: number
    }) =>
    async (dispatch: Dispatch): Promise<void> => {
        // console.log("Creating Recipe", recipe)
        try {
            const recipesString = await AsyncStorage.getItem('recipes')
            if (recipesString !== null) {
                const localRecipes: Recipe[] = JSON.parse(recipesString)

                const newRecipe = await recipeService.createRecipe(recipe)

                localRecipes.push(newRecipe)
                await AsyncStorage.setItem(
                    'recipes',
                    JSON.stringify(localRecipes)
                )
                dispatch({
                    type: RECIPEACTIONS.ADD_RECIPE,
                    payload: { newRecipe },
                })
            }
        } catch (err) {
            console.log(err.message)
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
                await AsyncStorage.setItem('recipes', JSON.stringify([]))
                rs = '[]'
            }
            const recipes: Recipe[] = JSON.parse(rs)
            // Put recipes without a database id into the database
            const localRecipes = recipes.filter((recipe) => recipe.id === 0)
            if (localRecipes.length > 0) {
                await recipeService.createRecipes(localRecipes)
            }

            // Get all my recipes from database
            const newRecipes = await recipeService.getMyRecipes()
            await AsyncStorage.setItem('recipes', JSON.stringify(recipes))
            dispatch({
                type: RECIPEACTIONS.SET_RECIPES,
                payload: { newRecipes },
            })
        } catch (err) {
            console.log(err.message)
            console.error(err)
        }
    }

export const deleteRecipe =
    (recipe: Recipe) =>
    async (dispatch: Dispatch): Promise<void> => {
        console.log('Deleting Recipe', recipe)
    }
