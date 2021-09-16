import { Dispatch } from 'redux'
import {
    SETTINGS_ACTIONS,
} from '../reducers/settings'


export const setInvertedColors =
    (invertedColors: boolean) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type: SETTINGS_ACTIONS.SET_INVERTED_COLORS,
            payload: { invertedColors },
        })
    }
