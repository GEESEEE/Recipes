import { Dispatch } from 'redux'
import { BROWSE_SORT_ACTIONS } from '../reducers/browse-sort'

export type RecipeSortType = 'publishtime' | 'preparetime' | 'peoplecount' | 'ingredientcount' | 'instructioncount'
export type AddSortType = BROWSE_SORT_ACTIONS.ADD_SORT
export type RemoveSortType = BROWSE_SORT_ACTIONS.REMOVE_SORT
export type SwapSortType = BROWSE_SORT_ACTIONS.SWAP_SORT

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
