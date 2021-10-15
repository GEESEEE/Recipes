import React from 'react'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import { RootStack } from '@/routes'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { authActions } from '@/redux/slices'
import { useRetrieveTokenMutation } from '@/redux/services/auth'

function Wrapper(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    const dispatch = useAppDispatch()

    const [retrieveToken] = useRetrieveTokenMutation()

    React.useEffect(() => {
        console.log('Starting')
        dispatch(authActions.retrieveToken(retrieveToken))
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
