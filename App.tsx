import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import LoginNavigator from './app/routes/LoginStack'
import 'react-native-get-random-values'
import rootReducer from './app/reducers/root'

const store = createStore(rootReducer)

export default function App(): JSX.Element {

    return (
        <Provider store={store}>
            <LoginNavigator />
        </Provider>
        )
}
