import { Dispatch } from "redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { initialSettingsState, Settings, SETTINGS_ACTIONS } from "../reducers/settings"

export const retrieveSettings = () => async (dispatch: Dispatch): Promise<void> => {
    const settings = await AsyncStorage.getItem('settings')
    if (settings) {
        const newSettings = JSON.parse(settings)
        dispatch({
            type: SETTINGS_ACTIONS.SET_SETTINGS,
            payload: { newSettings },
        })
    } else {
        const stringifiedSettings = JSON.stringify(initialSettingsState)
        await AsyncStorage.setItem('settings', stringifiedSettings)
    }
}

export const setInvertedColors =
    (invertedColors: boolean) =>
    async (dispatch: Dispatch): Promise<void> => {
        dispatch({
            type: SETTINGS_ACTIONS.SET_INVERTED_COLORS,
            payload: { invertedColors }
        })

        const settingsString = await AsyncStorage.getItem('settings') as string
        const settings: Settings = JSON.parse(settingsString)
        settings.invertedColors = invertedColors
        await AsyncStorage.setItem('settings', JSON.stringify(settings))
    }
