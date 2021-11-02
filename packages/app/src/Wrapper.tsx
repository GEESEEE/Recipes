import React from 'react'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import { RootStack } from '@/routes'
import { useSettings } from '@/hooks'

function Wrapper(): JSX.Element {
    const { theme } = useSettings()

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
