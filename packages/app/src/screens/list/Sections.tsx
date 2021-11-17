import React from 'react'
import styled from 'styled-components'
import * as SecureStore from 'expo-secure-store'
import { Section } from '@recipes/api-types/v1'
import { LoadingModal, LoginModal } from '@/screens/modals'
import {
    useAppDispatch,
    useAuth,
    useSettings,
    useHeader,
    useSearch,
    useUpdateEffect,
    useSections,
    useSectionHeight,
} from '@/hooks'
import { View, Icons } from '@/components/base'
import { authActions, authService, sectionService } from '@/redux'
import { SectionListItem } from '@/components/molecules'
import { ListItemRecyclerView } from '@/components/organisms'
import { sectionsActions } from '@/redux/slices'
import { applySearch, sortPosition } from '@/utils'

function SectionsScreen({ navigation }: { navigation: any }): JSX.Element {
    const auth = useAuth()
    const settings = useSettings()
    const { theme } = settings
    const sectionHeight = useSectionHeight()
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

    useHeader(navigation, {
        title: 'Sections',
        drawer: true,
        search: true,
        right: [
            {
                type: Icons.MyFeather,
                name: 'plus',
                onPress: () => navigation.navigate('EditSection'),
            },
        ],
    })

    // Sections configuration
    async function setSections(sections: Section[]): Promise<void> {
        await dispatch(sectionsActions.setSections(sections))
    }

    const getSections = sectionService.useGetSectionsQuery(undefined, {
        skip: !auth.token,
    })

    useUpdateEffect(() => {
        if (typeof getSections.data !== 'undefined') {
            setSections(getSections.data)
        }
    }, [getSections.data])

    const [updateSections] = sectionService.useUpdateSectionsMutation()

    const allSections = useSections()
    const sections = sortPosition(allSections)

    const search = useSearch()
    const filteredSections = applySearch<Section>(
        sections,
        [search],
        ['name', 'description']
    )

    return (
        <Container backgroundColor={theme.background}>
            {verifyTokenStatus.isLoading ? <LoadingModal /> : null}
            {auth.user.id < 0 ? <LoginModal /> : null}

            <ListItemRecyclerView
                Element={SectionListItem}
                data={filteredSections}
                props={{ useDropdown: true }}
                loading={getSections.isLoading}
                dragDrop
                updateSlice={sectionsActions.updateSections}
                updateDatabase={updateSections}
                itemHeight={sectionHeight}
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
