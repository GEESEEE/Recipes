import React from 'react'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import { RootStack } from '@/routes'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { authActions } from '@/redux/slices'
import { useVerifyTokenMutation } from '@/redux/services/auth'

function Wrapper(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    const dispatch = useAppDispatch()

    const [verifyToken] = useVerifyTokenMutation()

    React.useEffect(() => {
        console.log('Starting')
        dispatch(authActions.retrieveToken(verifyToken))
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
