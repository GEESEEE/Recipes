import React from 'react'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import { RootStack } from '@/routes'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { indicesActions } from '@/actions'

function Wrapper(): JSX.Element {
    const dispatch = useAppDispatch()
    const {theme} = useAppSelector((state) => state.settings)

    React.useEffect(() => {
        console.log('Starting')
        dispatch(indicesActions.retrieveIndices())
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
