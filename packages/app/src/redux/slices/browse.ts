import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Recipe } from '@recipes/api-types/v1'

const browseSlice = createSlice({
    name: 'browse',
    initialState: [] as Recipe[],
    reducers: {
        setRecipes(_, action: PayloadAction<Recipe[]>) {
            return action.payload
        },

        addRecipes(state, action: PayloadAction<Recipe[]>) {
            const newRecipes = action.payload
            const currentIds = state.map((r) => r.id)
            const actualNewRecipes = newRecipes.filter(
                (r) => !currentIds.includes(r.id)
            )
            return [...state, ...actualNewRecipes]
        },
    },
})

export const browseActions = browseSlice.actions
export const browseReducer = browseSlice.reducer
