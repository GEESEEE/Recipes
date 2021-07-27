import React from 'react'
import 'react-native-get-random-values'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import LoginNavigator from './app/routes/LoginStack'
import rootReducer from './app/reducers/root'


const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App(): JSX.Element {


    return (
        <Provider store={store}>
            <LoginNavigator />
        </Provider>
    )
}
