import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Recipe } from '@recipes/api-types/v1'

export type RecipesState = {
    [key: number]: Recipe[]
}

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {} as RecipesState,
    reducers: {
        setRecipes(
            state,
            action: PayloadAction<{ sectionId: number; recipes: Recipe[] }>
        ) {
            const { sectionId, recipes } = action.payload
            state[sectionId] = recipes
        },

        addRecipe(
            state,
            action: PayloadAction<{ sectionId: number; recipe: Recipe }>
        ) {
            const { sectionId, recipe } = action.payload
            if (typeof state[sectionId] !== 'undefined') {
                state[sectionId] = [...state[sectionId], recipe]
            }
        },

        removeRecipe(
            state,
            action: PayloadAction<{ sectionId: number; recipeId: number }>
        ) {
            const { sectionId, recipeId } = action.payload
            state[sectionId] = state[sectionId].filter(
                (recipe) => recipe.id !== recipeId
            )
        },

        updateRecipes(
            state,
            action: PayloadAction<{ sectionId: number; recipes: Recipe[] }>
        ) {
            const { sectionId, recipes } = action.payload
            state[sectionId] = state[sectionId].map((oldRecipe) => {
                const newRecipe = recipes.find((r) => r.id === oldRecipe.id)
                if (typeof newRecipe === 'undefined') {
                    return oldRecipe
                }
                return { ...oldRecipe, ...newRecipe }
            })
        },
    },
})

export const recipesActions = recipesSlice.actions
export const recipesReducer = recipesSlice.reducer
