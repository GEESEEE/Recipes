import { configureStore } from '@reduxjs/toolkit'
import { settingsSlice, authSlice } from './slices'

export const store = configureStore({
    reducer: {
        settings: settingsSlice.reducer,
        auth: authSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
