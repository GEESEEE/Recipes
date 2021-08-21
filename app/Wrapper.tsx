import React from 'react'
import { ThemeProvider } from 'styled-components'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { retrieveTheme, retrieveColor } from './actions/theme'
import { LoginStack } from './routes'
import { useAppDispatch, useAppSelector } from './hooks'
import { retrieveIndices } from './actions/indices'

function Wrapper(): JSX.Element {
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.theme)

    React.useEffect(() => {
        console.log('Starting')
        dispatch(retrieveColor())
        dispatch(retrieveTheme())
        dispatch(retrieveIndices())
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <SafeAreaProvider>
                <LoginStack />
            </SafeAreaProvider>
        </ThemeProvider>
    )
}

export default Wrapper
