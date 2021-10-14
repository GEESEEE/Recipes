import { createSlice } from '@reduxjs/toolkit'
import { themeUtils } from '@/config'
import { Typography } from '@/styles'

export interface Settings {
    invertedColors: boolean
    textSize: Typography.TextSize
    theme: themeUtils.Theme
}

const initialState: Settings = {
    invertedColors: false,
    textSize: 'm',
    theme: themeUtils.darkTheme(),
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
})

export default settingsSlice
