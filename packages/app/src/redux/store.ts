import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query/react'
import { settingsReducer, authReducer } from './slices'
import { api } from './services'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        settings: settingsReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
