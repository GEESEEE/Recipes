import React from 'react'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import { RootStack } from '@/routes'
import { useAppSelector } from '@/hooks'

function Wrapper(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    React.useEffect(() => {
        console.log('Starting')
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </ThemeProvider>
    )
}

export default Wrapper
