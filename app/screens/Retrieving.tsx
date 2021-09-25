import React from 'react'
import styled from 'styled-components'
import { View } from 'react-native'
import { authActions } from '@/actions'
import { Loading4Dots } from '@/components/animations'
import { useAppDispatch, useAppSelector, useUpdateEffect } from '@/hooks'

function RetrievingScreen({ navigation }: { navigation: any }): JSX.Element {
    const {theme, auth} = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        console.log("Retrieving token")
        dispatch(authActions.retrieveToken(navigation))
    }, [])


    useUpdateEffect(() => {
        console.log("Effecctt")
        if (auth.token.length > 0) {
            console.log("Got a token")
            navigation.navigate('Main')
        } else {
            console.log("Didnt get a token yet")
            navigation.navigate('Login')
        }
    }, [auth.retrieveFinished])

    return (
        <Container>
            <Loading4Dots
                backgroundColor={theme.background}
                dotColor={theme.primary}
            />
        </Container>
    )
}

export default RetrievingScreen

const Container = styled(View)`
    flex: 1;
    background-color: ${(props) => props.theme.background};
`
