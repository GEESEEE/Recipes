import React from 'react'
import styled from 'styled-components'
import { Section, SectionCreate, SectionUpdate } from '@recipes/api-types/v1'
import { useRoute } from '@react-navigation/native'
import { View, Icons } from '@/components/base'
import {
    HeaderComponent,
    HeaderConfig,
    SectionListItem,
} from '@/components/molecules'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { sectionsActions, sectionsSelector, sectionService } from '@/redux'

type EditSectionScreenProps = {
    navigation: any
}

function EditSectionScreen({
    navigation,
}: EditSectionScreenProps): JSX.Element {
    const dispatch = useAppDispatch()

    const route = useRoute()
    const editing = Boolean(route.params)

    let sectionId = -1
    if (route.params) {
        sectionId = (route.params as any).id
    }

    let section = useAppSelector((state) =>
        sectionsSelector.selectById(state.sections, sectionId)
    )
    if (typeof section === 'undefined') {
        section = new Section()
    }

    const [sectionData, setSectionData] = React.useState<Section>(section)

    const [createSection, createSectionState] =
        sectionService.useCreateSectionMutation()

    const [updateSection, updateSectionState] =
        sectionService.useUpdateSectionMutation()

    const handleSaveSection = React.useCallback(
        async (sectionData: Section): Promise<void> => {
            const createData: SectionCreate = {
                position: -1,
                name: sectionData.name,
                description: sectionData.description,
            }
            const section = await createSection(createData)

            if ('data' in section) {
                await dispatch(sectionsActions.addSection(section.data))
                navigation.pop()
            }
        },
        [createSection, dispatch, navigation]
    )

    const handleEditSection = React.useCallback(
        async (sectionData: Section): Promise<void> => {
            console.log('Editing Section', sectionData)
            const updateData: SectionUpdate = {
                id: sectionData.id,
                name: sectionData.name,
                description: sectionData.description,
            }
            const section = await updateSection(updateData)

            if ('data' in section) {
                await dispatch(sectionsActions.upsertSection(section.data))
                navigation.pop()
            }
        },
        [updateSection, dispatch, navigation]
    )

    function handleSectionNameChange(name: string): void {
        setSectionData({ ...sectionData, name })
    }

    function handleSectionDescriptionChange(description: string): void {
        setSectionData({ ...sectionData, description })
    }

    // Header configuration
    React.useLayoutEffect(() => {
        const headerConfig: HeaderConfig = {
            right: [
                {
                    type: Icons.MyFeather,
                    name: 'save',
                    onPress: () =>
                        editing
                            ? handleEditSection(sectionData)
                            : handleSaveSection(sectionData),
                    loading:
                        createSectionState.isLoading ||
                        updateSectionState.isLoading,
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
    }, [
        navigation,
        sectionData,
        createSectionState.isLoading,
        updateSectionState.isLoading,
        handleSaveSection,
        handleEditSection,
        editing,
    ])

    return (
        <Container>
            <SectionListItem
                item={sectionData}
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
    align-items: center;
`