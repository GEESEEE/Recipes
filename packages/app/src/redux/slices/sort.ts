import { RecipeSortOptions } from '@recipes/api-types/v1'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SortState = {
    order: RecipeSortOptions[]
    state: { [key in RecipeSortOptions]: boolean }
}

const initialState: SortState = {
    order: [],
    state: {
        createtime: false,
        publishtime: false,
        preparetime: true,
        peoplecount: true,
        ingredientcount: true,
        instructioncount: true,
    },
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        reset() {
            return initialState
        },

        addSort(state, action: PayloadAction<RecipeSortOptions>) {
            state.order = [...state.order, action.payload]
        },

        removeSort(state, action: PayloadAction<RecipeSortOptions>) {
            state.order = state.order.filter(
                (option) => option !== action.payload
            )
        },

        swapSortState(state, action: PayloadAction<RecipeSortOptions>) {
            const sort = action.payload
            state.state[sort] = !state.state[sort]
        },
    },
})

export const sortActions = sortSlice.actions
export const sortReducer = sortSlice.reducer
