import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Report } from '@recipes/api-types/v1'

const reportSlice = createSlice({
    name: 'report',
    initialState: [] as Report[],
    reducers: {
        setReports(_, action: PayloadAction<Report[]>) {
            return action.payload
        },
        addReport(state, action: PayloadAction<Report>) {
            state = [...state, action.payload]
        },
    },
})

export const reportActions = reportSlice.actions
export const reportReducer = reportSlice.reducer
