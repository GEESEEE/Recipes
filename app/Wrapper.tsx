import React from 'react'
import { ThemeProvider } from 'styled-components'
import { retrieveTheme, retrieveColor } from './actions/theme'
import { LoginStack } from './routes'
import { useAppDispatch, useAppSelector } from './hooks'
import { retrieveIndices } from './actions/indices'
import { retrieveSettings } from './actions/settings'

function Wrapper(): JSX.Element {
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.theme)

    React.useEffect(() => {
        console.log('Starting')
        dispatch(retrieveColor())
        dispatch(retrieveTheme())
        dispatch(retrieveIndices())
        dispatch(retrieveSettings())
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <LoginStack />
        </ThemeProvider>
    )
}

export default Wrapper
