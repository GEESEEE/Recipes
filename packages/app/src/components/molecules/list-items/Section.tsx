import React from 'react'
import styled from 'styled-components'
import { Section } from '@recipes/api-types/v1'
import { useNavigation } from '@react-navigation/native'
import { View } from '@/components/base'
import { ListItem, Editable } from '@/components/atoms'
import { utils } from '@/utils'
import { sectionsActions, sectionService } from '@/redux'
import { useAppDispatch } from '@/hooks'
import { ListItemBaseProps } from '@/types'

interface SectionListItemProps extends ListItemBaseProps<Section> {
    handleSectionNameChange?: (text: string) => void
    handleSectionDescriptionChange?: (text: string) => void
}

function SectionListItem({
    item,
    dropdownItems,
    onGesture,
    editable,
    handleSectionNameChange,
    handleSectionDescriptionChange,
}: SectionListItemProps): JSX.Element {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()

    dropdownItems = dropdownItems || []

    const [deleteSection] = sectionService.useDeleteSectionMutation()

    function logSect(): void {
        console.log('Section', item.name)
    }

    async function deleteSect(): Promise<void> {
        const res = await deleteSection(item.id)
        if ('data' in res) {
            dispatch(sectionsActions.removeSection(item.id))
        }
    }

    function editSect(): void {
        navigation.navigate('EditSection', { sectionId: item.id })
    }

    function onPress(): void {
        navigation.navigate('Recipes', { sectionId: item.id })
    }

    dropdownItems.push(logSect, editSect, deleteSect)

    return (
        <ListItem
            items={
                !editable
                    ? utils.createDropDownItems(dropdownItems, 'sect')
                    : undefined
            }
            onPress={!editable ? onPress : undefined}
            onGesture={onGesture}
        >
            <Container>
                <Editable
                    editable={editable}
                    text={item.name}
                    handleTextChange={handleSectionNameChange}
                    type="SubHeader"
                    paddingHorizontal="s"
                    numberOfLines={1}
                    placeholder="Section Name"
                />
                <Editable
                    editable={editable}
                    text={item.description}
                    handleTextChange={handleSectionDescriptionChange}
                    paddingHorizontal="s"
                    numberOfLines={2}
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
