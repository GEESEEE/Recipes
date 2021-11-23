import React from 'react'
import styled from 'styled-components'
import { Section } from '@recipes/api-types/v1'
import { useNavigation } from '@react-navigation/native'
import ListItem from './ListItem'
import { View } from '@/components/base'
import { Editable } from '@/components/atoms'
import { useSectionDropdownItems } from '@/hooks'
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
    const navigation = useNavigation<any>()

    function onPress(): void {
        navigation.navigate('Recipes', { sectionId: item.id })
    }

    const dropdownItems = useSectionDropdownItems(item)

    const [focusDescription, setFocusDescription] = React.useState(false)

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
                    onSubmitEditing={() => setFocusDescription(true)}
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
                    focus={focusDescription}
                    onFocus={() => setFocusDescription(false)}
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
