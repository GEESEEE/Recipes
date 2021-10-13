import React from 'react'
import 'react-native-get-random-values'
import { Provider } from 'react-redux'
import { store as newStore} from '@/redux'
import Wrapper from '@/Wrapper'

export default function App(): JSX.Element {

    React.useEffect(() => {
        console.log('Starting')
    }, [])

    return (
        <Provider store={newStore}>
            <Wrapper />
        </Provider>
    )
}
