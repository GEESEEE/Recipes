import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import Recipe from '../data/recipe'

export const RecipesContext = React.createContext<any>(undefined)

export const RecipesKeyContext = React.createContext<any>(undefined)

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
            const newState = [...recipes, action.payload.recipe]
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

async function storeRecipesKey(key: number):Promise<number> {
    try {
        await AsyncStorage.setItem('recipesKey', JSON.stringify(key))
    } catch (err) {
        console.error(err)
    }
    return key
}

export function RecipesContextProvider( {children}: {children: JSX.Element}): JSX.Element {
    const [recipes, recipesDispatch] = React.useReducer(reducer, [])

    const [recipeKey, setRecipeKey] = React.useState(0)

    const getRecipeKey = (): string => {
        const key = recipeKey
        setRecipeKey(key + 1)
        storeRecipesKey(key + 1)
        return key.toString()
    }

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
            <RecipesKeyContext.Provider value={getRecipeKey}>
                {children}
            </RecipesKeyContext.Provider>
        </RecipesContext.Provider>
    )
}
