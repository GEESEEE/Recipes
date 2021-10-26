import { createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { Recipe } from '@recipes/api-types/v1'

const recipesAdapter = createEntityAdapter<Recipe>({})

export type RecipesState = {
    [key: number]: EntityState<Recipe>
}

const initialState: RecipesState = {}

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
})

export const recipesActions = recipesSlice.actions
export const recipesReducer = recipesSlice.reducer
