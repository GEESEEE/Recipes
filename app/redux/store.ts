import { configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query/react'
import { settingsReducer, authReducer } from './slices'
import { sectionApi } from './services'

export const store = configureStore({
    reducer: {
        [sectionApi.reducerPath]: sectionApi.reducer,
        settings: settingsReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sectionApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
