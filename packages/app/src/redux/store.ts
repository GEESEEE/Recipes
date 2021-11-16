import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query/react'
import {
    settingsReducer,
    authReducer,
    sectionsReducer,
    recipesReducer,
    editRecipeReducer,
    browseReducer,
    sortReducer,
} from './slices'
import { api } from './services'
import { logMiddleware } from './middleware'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        settings: settingsReducer,
        auth: authReducer,
        sections: sectionsReducer,
        recipes: recipesReducer,
        editRecipe: editRecipeReducer,
        browse: browseReducer,
        sort: sortReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(api.middleware)
            .concat(logMiddleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
