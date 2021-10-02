import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch } from 'redux'
import { INDICES_ACTIONS } from '../reducers/indices'

export const retrieveIndices =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            let recipeId = await AsyncStorage.getItem('recipeId')
            if (!recipeId) {
                await AsyncStorage.setItem('recipeId', JSON.stringify(0))
                recipeId = JSON.stringify(0)
            }
            recipeId = JSON.parse(recipeId)

            let ingredientId = await AsyncStorage.getItem('ingredientId')
            if (!ingredientId) {
                await AsyncStorage.setItem('ingredientId', JSON.stringify(0))
                ingredientId = JSON.stringify(0)
            }
            ingredientId = JSON.parse(ingredientId)

            let instructionId = await AsyncStorage.getItem('instructionId')
            if (!instructionId) {
                await AsyncStorage.setItem('instructionId', JSON.stringify(0))
                instructionId = JSON.stringify(0)
            }
            instructionId = JSON.parse(instructionId)

            dispatch({
                type: INDICES_ACTIONS.SET_STATE,
                payload: { recipeId, instructionId, ingredientId },
            })
        } catch (err) {
            console.error(err)
        }
    }

export const decrementRecipeId =
    (oldRecipeId: number) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const recipeId = oldRecipeId - 1
            dispatch({
                type: INDICES_ACTIONS.SET_RECIPE_ID,
                payload: { recipeId },
            })
            await AsyncStorage.setItem('recipeId', JSON.stringify(recipeId))
        } catch (err) {
            console.error(err)
        }
    }

export const decrementIngredientId =
    (oldIngredientId: number) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const ingredientId = oldIngredientId - 1
            dispatch({
                type: INDICES_ACTIONS.SET_INGREDIENT_ID,
                payload: { ingredientId },
            })
            await AsyncStorage.setItem(
                'ingredientId',
                JSON.stringify(ingredientId)
            )
        } catch (err) {
            console.error(err)
        }
    }

export const decrementInstructionId =
    (oldInstructionId: number) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const instructionId = oldInstructionId - 1
            dispatch({
                type: INDICES_ACTIONS.SET_INSTRUCTION_ID,
                payload: { instructionId },
            })
            await AsyncStorage.setItem(
                'instructionId',
                JSON.stringify(instructionId)
            )
        } catch (err) {
            console.error(err)
        }
    }
