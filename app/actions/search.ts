import { Dispatch } from 'redux'
import { BROWSE_SEARCH_ACTIONS } from '../reducers/browse'
import { MY_SEARCH_ACTIONS } from '../reducers/my'

type AddSearchType =
    | BROWSE_SEARCH_ACTIONS.ADD_SEARCH
    | MY_SEARCH_ACTIONS.ADD_SEARCH
type RemoveSearchType =
    | BROWSE_SEARCH_ACTIONS.REMOVE_SEARCH
    | MY_SEARCH_ACTIONS.REMOVE_SEARCH

export const initialSearchState: string[] = []

export const addSearch =
    (type: AddSearchType, search: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type,
            payload: { search },
        })
    }

export const removeSearch =
    (type: RemoveSearchType, search: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type,
            payload: { search },
        })
    }
