import React from 'react'
import styled from 'styled-components'
import * as SecureStore from 'expo-secure-store'
import { Section } from '@recipes/api-types/v1'
import { LoginModal } from '@/screens/Login'
import { LoadingModal } from '@/screens/modals'
import { useAppDispatch, useAppSelector, useUpdateEffect } from '@/hooks'
import { View, Icons, Text } from '@/components/base'
import { authActions, authService, userService } from '@/redux'
import {
    HeaderComponent,
    HeaderConfig,
    SectionListItem,
} from '@/components/molecules'
import { ListItemRecyclerView } from '@/components/organisms'
import { sectionsActions, sectionsSelector } from '@/redux/slices'

function SectionsScreen({ navigation }: { navigation: any }): JSX.Element {
    const { auth, settings } = useAppSelector((state) => state)
    const { theme } = settings

    const sections = useAppSelector((state) =>
        sectionsSelector.selectAll(state.sections)
    )

    const dispatch = useAppDispatch()
    const [verifyToken, verifyTokenStatus] =
        authService.useVerifyTokenMutation()
    const getSections = userService.useGetSectionsQuery()

    async function retrieveToken(): Promise<void> {
        const token = await SecureStore.getItemAsync('token')
        if (token) {
            const res = await verifyToken(token)
            if ('data' in res) {
                await dispatch(authActions.login({ user: res.data, token }))
            }
        }
    }

    async function setSections(sections: Section[]): Promise<void> {
        await dispatch(sectionsActions.setSections(sections))
    }

    React.useEffect(() => {
        retrieveToken()
    }, [])

    useUpdateEffect(() => {
        if (typeof getSections.data !== 'undefined') {
            setSections(getSections.data)
        }
    }, [getSections.data])

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

    console.log('sec', sections)

    return (
        <Container backgroundColor={theme.background}>
            {verifyTokenStatus.isLoading ? <LoadingModal /> : null}

            {auth.user.id < 0 ? <LoginModal /> : null}
            <Text>Goeie shit</Text>
            <ListItemRecyclerView
                Element={SectionListItem}
                data={sections}
                props={{}}
            />
        </Container>
    )
}

export default SectionsScreen

const Container = styled(View)`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`
