import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Report } from '@recipes/api-types/v1'

const reportSlice = createSlice({
    name: 'report',
    initialState: [] as Report[],
    reducers: {},
})

export const reportActions = reportSlice.actions
export const reportReducer = reportSlice.reducer
