import { Dispatch } from 'redux'

export const initialSearchState: string[] = []

export const addSearch =
    (type: string, search: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type,
            payload: { search },
        })
    }

export const removeSearch =
    (type: string, search: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type,
            payload: { search },
        })
    }
