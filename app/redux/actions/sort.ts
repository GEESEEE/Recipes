import { Dispatch } from 'redux'

export type RecipeSortType =
    | 'publishtime'
    | 'createtime'
    | 'preparetime'
    | 'peoplecount'
    | 'ingredientcount'
    | 'instructioncount'

export interface SortType {
    type: RecipeSortType
    name: string
    options: string[]
}

export const sorts: SortType[] = [
    {
        type: 'createtime',
        name: 'Created time',
        options: ['old - new', 'new - old'],
    },
    {
        type: 'publishtime',
        name: 'Publish time',
        options: ['old - new', 'new - old'],
    },
    {
        type: 'preparetime',
        name: 'Prepare time',
        options: ['ascending', 'descending'],
    },
    {
        type: 'peoplecount',
        name: 'People count',
        options: ['ascending', 'descending'],
    },
    {
        type: 'ingredientcount',
        name: 'Ingredient count',
        options: ['ascending', 'descending'],
    },
    {
        type: 'instructioncount',
        name: 'Instruction count',
        options: ['ascending', 'descending'],
    },
]

export type SortStateType = {
    sortState: string[]
    orders: {
        [key in RecipeSortType]: boolean
    }
}

export const initialSortState: SortStateType = {
    sortState: [],
    orders: {
        createtime: false,
        publishtime: false,
        preparetime: true,
        peoplecount: true,
        ingredientcount: true,
        instructioncount: true,
    },
}

export const addSort =
    (type: string, sortType: RecipeSortType, order: boolean) =>
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
    (type: string, sort: RecipeSortType) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type,
            payload: { sort },
        })
    }

export const swapSort =
    (type: string, sort: RecipeSortType) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type,
            payload: { sort },
        })
    }

export const toggleSort =
    (type: string, sort: RecipeSortType) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type,
            payload: { sort },
        })
    }
