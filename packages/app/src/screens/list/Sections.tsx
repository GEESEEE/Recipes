import React from 'react'
import styled from 'styled-components'
import * as SecureStore from 'expo-secure-store'
import { Section } from '@recipes/api-types/v1'
import { useNavigationState, useRoute } from '@react-navigation/native'
import { LoadingModal, LoginModal } from '@/screens/modals'
import { useAppDispatch, useAppSelector, useUpdateEffect } from '@/hooks'
import { View, Icons } from '@/components/base'
import { authActions, authService, sectionService } from '@/redux'
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
    const dispatch = useAppDispatch()

    // Verify Token stuff
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

    // Header configuration
    React.useLayoutEffect(() => {
        const headerConfig: HeaderConfig = {
            drawer: true,
            search: true,
            right: [
                {
                    type: Icons.MyFeather,
                    name: 'plus',
                    onPress: () => navigation.navigate('EditSection'),
                },
            ],
        }
        navigation.setOptions({
            header: () => (
                <HeaderComponent
                    navigation={navigation}
                    config={headerConfig}
                />
            ),
        })
    }, [navigation])

    // Sections configuration

    let listDragDrop = true
    let search = ''
    const route = useRoute() as {
        params?: { headerSearch: string }
    }
    if (
        typeof route.params !== 'undefined' &&
        route.params.headerSearch.length > 0
    ) {
        listDragDrop = false
        search = route.params.headerSearch
    }

    console.log('Seac', search)

    async function setSections(sections: Section[]): Promise<void> {
        await dispatch(sectionsActions.setSections(sections))
    }

    const sections = useAppSelector((state) =>
        sectionsSelector.selectAll(state.sections)
    )
    const getSections = sectionService.useGetSectionsQuery(undefined, {
        skip: !auth.token,
    })

    useUpdateEffect(() => {
        if (typeof getSections.data !== 'undefined') {
            setSections(getSections.data)
        }
    }, [getSections.data])

    const [updateSections] = sectionService.useUpdateSectionsMutation()

    return (
        <Container backgroundColor={theme.background}>
            {verifyTokenStatus.isLoading ? <LoadingModal /> : null}

            {auth.user.id < 0 ? <LoginModal /> : null}
            <ListItemRecyclerView
                Element={SectionListItem}
                data={sections}
                props={{}}
                loading={getSections.isLoading}
                dragDrop={listDragDrop}
                updateDatabase={updateSections}
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
