import React from 'react'
import 'react-native-get-random-values'
import { Provider } from 'react-redux'
import { LogBox } from 'react-native'
import { store as newStore } from '@/redux'
import Wrapper from '@/Wrapper'

export default function App(): JSX.Element {
    React.useEffect(() => {
        LogBox.ignoreLogs([''])
        console.log('Starting')
    }, [])

    return (
        <Provider store={newStore}>
            <Wrapper />
        </Provider>
    )
}
