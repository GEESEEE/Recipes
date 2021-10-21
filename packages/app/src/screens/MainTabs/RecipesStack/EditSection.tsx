import React from 'react'
import styled from 'styled-components'
import { Section, SectionCreate } from '@recipes/api-types/v1'
import { useRoute } from '@react-navigation/native'
import { View, Icons } from '@/components/base'
import {
    HeaderComponent,
    HeaderConfig,
    SectionListItem,
} from '@/components/molecules'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { userService, sectionsActions, sectionsSelector } from '@/redux'

type EditSectionScreenProps = {
    navigation: any
}

function EditSectionScreen({
    navigation,
}: EditSectionScreenProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    const dispatch = useAppDispatch()

    const route = useRoute()
    console.log('Editsection', route)

    if (route.params) {
        console.log(route.params)
        // const id = route.params.id
        // section = useAppSelector(sectionsSelector.selectById(id))
    }

    const [data, setData] = React.useState<Section>(new Section())

    const [createSection, createSectionState] =
        userService.useCreateSectionMutation()

    async function handleSaveSection(data: Section): Promise<void> {
        console.log('Create Section', data)
        const createData: SectionCreate = {
            name: data.name,
            description: data.description,
        }
        const section = await createSection(createData)

        if ('data' in section) {
            await dispatch(sectionsActions.addSection(section.data))
            navigation.pop()
        }
    }

    // Header configuration
    const headerConfig: HeaderConfig = {
        right: [
            {
                type: Icons.MyFeather,
                name: 'save',
                onPress: () => handleSaveSection(data),
                loading: createSectionState.isLoading,
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

    // Data handling

    function handleSectionNameChange(name: string): void {
        setData({ ...data, name })
    }

    function handleSectionDescriptionChange(description: string): void {
        setData({ ...data, description })
    }

    return (
        <Container>
            <SectionListItem
                item={data}
                editable
                handleSectionNameChange={handleSectionNameChange}
                handleSectionDescriptionChange={handleSectionDescriptionChange}
            />
        </Container>
    )
}

export default EditSectionScreen

const Container = styled(View)`
    flex: 1;
    background-color: ${(props) => props.theme.background};
`
