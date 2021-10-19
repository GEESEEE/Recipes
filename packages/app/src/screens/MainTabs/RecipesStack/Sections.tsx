import React from 'react'
import styled from 'styled-components'
import * as SecureStore from 'expo-secure-store'
import { LoginModal } from '@/screens/Login'
import { LoadingModal } from '@/screens/modals'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { View, Icons } from '@/components/base'
import { authActions, authService } from '@/redux'
import { HeaderComponent, HeaderConfig } from '@/components/molecules'

function SectionsScreen({ navigation }: { navigation: any }): JSX.Element {
    const { auth, settings } = useAppSelector((state) => state)
    const { theme } = settings

    const dispatch = useAppDispatch()
    const [verifyToken, verifyTokenStatus] =
        authService.useVerifyTokenMutation()

    async function retrieveToken(): Promise<void> {
        const token = await SecureStore.getItemAsync('token')
        if (token) {
            const res = await verifyToken(token)
            if ('data' in res) {
                await dispatch(authActions.login({ user: res.data, token }))
            }
        }
    }

    React.useEffect(() => {
        retrieveToken()
    }, [])

    const headerConfig: HeaderConfig = {
        right: [
            {
                type: Icons.MyFeather,
                name: 'plus',
                onPress: () => navigation.navigate('EditRecipeTabs'),
            },
        ],
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <HeaderComponent
                    navigation={navigation}
                    config={headerConfig}
                />
            ),
        })
    }, [navigation])

    return (
        <Container backgroundColor={theme.background}>
            {verifyTokenStatus.isLoading ? <LoadingModal /> : null}

            {auth.user.id < 0 ? <LoginModal /> : null}
        </Container>
    )
}

export default SectionsScreen

const Container = styled(View)`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`
