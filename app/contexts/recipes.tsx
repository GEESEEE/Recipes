import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import Recipe from '../data/recipe'

export const RecipesContext = React.createContext<any>(undefined)

export const RECIPEACTIONS = {
    ADD: 'addRecipe',
    SET: 'setRecipes',
    DELETE: 'deleteRecipe'
}

async function storeRecipes(recipes: Recipe[]): Promise<Recipe[]> {
    try {
        await AsyncStorage.setItem('recipes', JSON.stringify(recipes))
    } catch (err) {
        console.error(err)
    }
    return recipes
}

function reducer(recipes: Recipe[], action : any): Recipe[] {
    switch (action.type) {
        case RECIPEACTIONS.ADD: {
            const newState = [...recipes, action.recipe]
            storeRecipes(newState)
            return newState
        }

        case RECIPEACTIONS.SET: {
            const newState = action.payload.recipes
            storeRecipes(newState)
            return newState
        }

        case RECIPEACTIONS.DELETE: {
            const newState = recipes.filter(recipe => recipe.key !== action.payload.key)
            storeRecipes(newState)
            return newState
        }

        default:
            return recipes
    }
}

export function RecipesContextProvider( {children}: {children: JSX.Element}): JSX.Element {
    const [recipes, recipesDispatch] = React.useReducer(reducer, [])

    const initContext = async (): Promise<void> => {
        try {
            let rs = await AsyncStorage.getItem('recipes')
            if (rs === null) {
                await AsyncStorage.setItem('recipes', JSON.stringify([]))
                rs = '[]'
            }
            recipesDispatch({type: RECIPEACTIONS.SET, payload: {recipes: JSON.parse(rs)}})
            console.log('Recipes set')
        } catch (err) {
            console.error(err)
        }
    }

    React.useEffect( () => {
        initContext()
    }, [])

    return (
        <RecipesContext.Provider value={{recipes, dispatch: recipesDispatch}} >
            {children}
        </RecipesContext.Provider>
    )
}
