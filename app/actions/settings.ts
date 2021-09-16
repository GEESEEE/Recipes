import { Dispatch } from 'redux'
import {
    SETTINGS_ACTIONS,
} from '../reducers/settings'
import * as userService from '../services/user'

export const setInvertedColors =
    (invertedColors: boolean) =>
    async (dispatch: Dispatch): Promise<void> => {
        try{
            dispatch({
                type: SETTINGS_ACTIONS.SET_INVERTED_COLORS,
                payload: { invertedColors },
            })
            await userService.updateSettings({ invertedColors})
        } catch (err: any) {
            console.error(err)
        }

    }
