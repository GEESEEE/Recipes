import React from 'react'
import 'react-native-get-random-values'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './app/reducers/root'
import AppWrapper from './app/AppWrapper'

const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default function App(): JSX.Element {
    return (
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    )
}
