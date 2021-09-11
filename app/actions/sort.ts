import { Dispatch } from 'redux'
import { BROWSE_SORT_ACTIONS } from '../reducers/browse'
import { MY_SORT_ACTIONS } from '../reducers/my'

export type RecipeSortType = 'publishtime' | 'preparetime' | 'peoplecount' | 'ingredientcount' | 'instructioncount'

export interface SortType {
    type: RecipeSortType,
    name: string,
    options: string[],
}

export const sorts: SortType[] = [{
    type: "publishtime",
    name: "Publish time",
    options: ["old - new", "new - old"],
}, {
    type: "preparetime",
    name: "Prepare time",
    options: ["ascending", "descending"]
}, {
    type: "peoplecount",
    name: "People count",
    options: ["ascending", "descending"]
}, {
    type: "ingredientcount",
    name: "Ingredient count",
    options: ["ascending", "descending"]
}, {
    type: "instructioncount",
    name: "Instruction count",
    options: ["ascending", "descending"]
}]

export type AddSortType = BROWSE_SORT_ACTIONS.ADD_SORT | MY_SORT_ACTIONS.ADD_SORT
export type RemoveSortType = BROWSE_SORT_ACTIONS.REMOVE_SORT | MY_SORT_ACTIONS.REMOVE_SORT
export type SwapSortType = BROWSE_SORT_ACTIONS.SWAP_SORT | MY_SORT_ACTIONS.SWAP_SORT
export type ToggleSortType = BROWSE_SORT_ACTIONS.TOGGLE_SORT | MY_SORT_ACTIONS.TOGGLE_SORT

export type SortStateType = {
    sortState: string[],
    orders: {
        [key in RecipeSortType]: boolean
    }
}

export const initialSortState: SortStateType = {
    sortState: [],
    orders: {
        publishtime: false,
        preparetime: true,
        peoplecount: true,
        ingredientcount: true,
        instructioncount: true,
    }
}

export const addSort =
    (type: AddSortType, sortType: RecipeSortType, order: boolean) =>
    async (dispatch: Dispatch): Promise<void> => {
        let sort: string = sortType
        if (!order) {
            sort = `-${sortType}`
        }

        dispatch({
            type,
            payload: { sort },
        })
    }

export const removeSort =
    (type: RemoveSortType, sort: RecipeSortType) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type,
            payload: { sort }
        })
    }


export const swapSort =
    (type: SwapSortType, sort: RecipeSortType) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type,
            payload: { sort }
        })
    }

export const toggleSort =
    (type: ToggleSortType, sort: RecipeSortType) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type,
            payload: { sort }
        })
    }
