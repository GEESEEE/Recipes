import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch } from 'redux'
import { AUTH_ACTIONS, BROWSE_RECIPE_ACTIONS,
    INITIALIZATION_ACTIONS, MY_RECIPE_ACTIONS, SETTINGS_ACTIONS, USER_ACTIONS } from '@/reducers'
import { recipeService, userService } from '@/services'
import { recipeUtils } from '@/config'
import { Recipe } from '@/data'
import { GetRecipeParams } from '@/services/recipe'
import { handleAPIError } from '@/config/routes'

export const initialize =
    (navigation: any): any =>
    async (dispatch: Dispatch) => {
        // All the functions below should be called here
        // dispatch(userActions.retrieveUserData())
        // dispatch(myRecipeActions.retrieveRecipes(navigation))
        // dispatch(
        //     browseRecipeActions.getRecipes({
        //         scopes: ['published'],
        //         sort: ['publishtime'],
        //     })
        // )

        try {

            {
                // Get User Data
                const token = await SecureStore.getItemAsync('token')
                if (token) {
                    const user = await userService.getUser({ token })

                    dispatch({
                        type: SETTINGS_ACTIONS.SET_SETTINGS,
                        payload: {
                            invertedColors: user.settings?.invertedColors,
                            color: user.settings?.color,
                            newTheme: user.settings?.theme,
                        },
                    })
                    dispatch({ type: USER_ACTIONS.GET_USER_SUCCES, payload: user })
                }
            }


            {
                // Retrieve my Recipes

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
                    await recipeUtils.createRecipes(localRecipes)
                }

                // Get all my recipes from database
                const myRecipesPagObject = await recipeUtils.getMyRecipes()
                const newRecipes = myRecipesPagObject.data

                await AsyncStorage.setItem('recipes', JSON.stringify(newRecipes))
                dispatch({
                    type: MY_RECIPE_ACTIONS.SET_RECIPES_SUCCES,
                    payload: { newRecipes },
                })
            }



            {
                // Get Browse Recipes from database
                const params: GetRecipeParams = {
                    scopes: ['published'],
                    sort: ['publishtime'],
                }

                const browseRecipesPagObject = await recipeService.getRecipes(params)

                dispatch({
                    type: BROWSE_RECIPE_ACTIONS.GET_RECIPES_SUCCES,
                    payload: {
                        newRecipes: browseRecipesPagObject.data,
                        nextPage: browseRecipesPagObject.next_page,
                        currentParams: params,
                    },
                })
            }

            // Finally dispatch initialized
            dispatch({
                type: INITIALIZATION_ACTIONS.DONE,
                payload: {}
            })

        } catch (err: any) {
            handleAPIError(
                err,
                navigation,
                dispatch,
                AUTH_ACTIONS.RETRIEVE_TOKEN_ERROR
            )
        }

    }


export const reset =
    (): any =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: INITIALIZATION_ACTIONS.RESET,
            payload: {}
        })
    }
