export const SETTINGS_ACTIONS = {
    SET_SETTINGS: 'setSettings',
    SET_INVERTED_COLORS: 'setInvertedColors',
}

export interface Settings {
    invertedColors: boolean
}

export const initialSettingsState: Settings = {
    invertedColors: false,
}

const settings = (
    state = initialSettingsState,
    action: { type: string; payload: any }
): Settings => {
    switch (action.type) {
        case SETTINGS_ACTIONS.SET_SETTINGS: {
            const { newSettings } = action.payload
            return newSettings
        }

        case SETTINGS_ACTIONS.SET_INVERTED_COLORS: {
            const { invertedColors } = action.payload
            return { ...state, invertedColors }
        }

        default: {
            return state
        }
    }
}

export default settings
