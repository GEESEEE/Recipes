import React from 'react'
import  { ThemeProvider } from 'styled-components'
import { retrieveTheme, retrieveColor } from './actions/theme'
import LoginNavigator from './routes/LoginStack'
import { useAppDispatch, useAppSelector } from './types/ReduxHooks'


function AppWrapper(): JSX.Element {
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.theme)

    React.useEffect(() => {
        dispatch(retrieveColor())
        dispatch(retrieveTheme())
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <LoginNavigator />
        </ThemeProvider>
    )
}

export default AppWrapper

