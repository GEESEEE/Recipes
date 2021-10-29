import React from 'react'
import styled from 'styled-components'
import { Section, SectionCreate, SectionUpdate } from '@recipes/api-types/v1'
import { useRoute } from '@react-navigation/native'
import { View, Icons } from '@/components/base'
import { SectionListItem } from '@/components/molecules'
import { useAppDispatch, useAppSelector, useHeader } from '@/hooks'
import { sectionsActions, sectionsSelector, sectionService } from '@/redux'
import { getNewPosition, sectionUpdateObject } from '@/utils'

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
        const params = route.params as any
        sectionId = params.sectionId
    }

    const sections = useAppSelector((state) =>
        sectionsSelector.selectAll(state.sections)
    )

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
            const createData: Omit<SectionCreate, 'userId'> = {
                position: getNewPosition(sections),
                name: sectionData.name,
                description: sectionData.description,
            }
            const section = await createSection(createData)

            if ('data' in section) {
                await dispatch(sectionsActions.addSection(section.data))
                navigation.pop()
            }
        },
        [createSection, dispatch, navigation, sections]
    )

    const handleEditSection = React.useCallback(
        async (sectionData: Section): Promise<void> => {
            const updatedSection = await updateSection(
                sectionUpdateObject(section as Section, sectionData)
            )

            if ('data' in updatedSection) {
                await dispatch(
                    sectionsActions.updateSection(updatedSection.data)
                )
                navigation.pop()
            }
        },
        [updateSection, dispatch, navigation, section]
    )

    function handleSectionNameChange(name: string): void {
        setSectionData({ ...sectionData, name })
    }

    function handleSectionDescriptionChange(description: string): void {
        setSectionData({ ...sectionData, description })
    }

    // Header configuration
    useHeader(navigation, {
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
    })

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
