import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { ThemeProvider } from 'styled-components'
import { retrieveTheme } from './actions/theme'
import LoginNavigator from './routes/LoginStack'



function AppWrapper(): JSX.Element {
    const dispatch = useDispatch()
    const theme = useSelector((state: any) => state.theme)

    React.useEffect(() => {
        dispatch(retrieveTheme())
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <LoginNavigator />
        </ThemeProvider>
    )
}

export default AppWrapper
