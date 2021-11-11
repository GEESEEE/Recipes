import React from 'react'
import styled from 'styled-components'
import { Section } from '@recipes/api-types/v1'
import { useNavigation } from '@react-navigation/native'
import ListItem from './ListItem'
import { View } from '@/components/base'
import { Editable } from '@/components/atoms'
import { createDropDownItems } from '@/utils'
import { sectionsActions, sectionService } from '@/redux'
import { useAppDispatch } from '@/hooks'
import { ListItemBaseProps } from '@/types'

interface SectionListItemProps extends ListItemBaseProps<Section> {
    handleSectionNameChange?: (text: string) => void
    handleSectionDescriptionChange?: (text: string) => void
}

function SectionListItem({
    item,
    useDropdown,
    onGesture,
    editable,
    releaseHeight,
    hide,
    handleSectionNameChange,
    handleSectionDescriptionChange,
}: SectionListItemProps): JSX.Element {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()

    const [deleteSection] = sectionService.useDeleteSectionMutation()

    async function deleteSect(): Promise<void> {
        const res = await deleteSection(item.id)
        if ('data' in res) {
            dispatch(sectionsActions.removeSection(item.id))
        }
    }

    function editSection(): void {
        navigation.navigate('EditSection', { sectionId: item.id })
    }

    function onPress(): void {
        navigation.navigate('Recipes', { sectionId: item.id })
    }

    const dropdownItems = [
        {
            id: 0,
            text: 'Edit',
            onPress: editSection,
        },
        {
            id: 1,
            text: 'Delete',
            onPress: deleteSect,
        },
    ]

    return (
        <ListItem
            items={useDropdown ? dropdownItems : undefined}
            onPress={!editable ? onPress : undefined}
            onGesture={onGesture}
            hide={hide}
        >
            <Container>
                <Editable
                    releaseHeight={releaseHeight}
                    editable={editable}
                    text={item.name}
                    handleTextChange={handleSectionNameChange}
                    type="SubHeader"
                    paddingHorizontal="s"
                    numberOfLines={1}
                    placeholder="Section Name"
                />
                <Editable
                    releaseHeight={releaseHeight}
                    editable={editable}
                    text={item.description}
                    handleTextChange={handleSectionDescriptionChange}
                    paddingHorizontal="s"
                    numberOfLines={2}
                    maxLength={1023}
                    placeholder="Description"
                />
            </Container>
        </ListItem>
    )
}

export default SectionListItem

const Container = styled(View)`
    flex-direction: column;
    justify-content: center;
`
