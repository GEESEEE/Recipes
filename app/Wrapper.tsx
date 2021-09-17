import React from 'react'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import { LoginStack } from './routes'
import { useAppDispatch, useAppSelector } from './hooks'
import { retrieveIndices } from './actions/indices'
import * as Navigator from './routes/root'

function Wrapper(): JSX.Element {
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.theme)

    React.useEffect(() => {
        console.log('Starting')
        dispatch(retrieveIndices())
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer ref={Navigator.navigationRef}>
                <LoginStack />
            </NavigationContainer>
        </ThemeProvider>
    )
}

export default Wrapper
