import React from 'react'
import styled from 'styled-components'
import { Section } from '@recipes/api-types/v1'
import { ListItemBaseProps } from './base'
import { View } from '@/components/base'
import { ListItem, Editable } from '@/components/atoms'
import { utils } from '@/utils'

interface SectionListItemProps extends ListItemBaseProps<Section> {
    editable?: boolean
    handleSectionNameChange?: (text: string) => void
    handleSectionDescriptionChange?: (text: string) => void
}

function SectionListItem({
    item,
    editable,
    handleSectionNameChange,
    handleSectionDescriptionChange,
}: SectionListItemProps): JSX.Element {
    function logSection(): void {
        console.log('Logging section')
    }

    return (
        <ListItem items={utils.createDropDownItems([logSection], 'section')}>
            <Container>
                <Editable
                    editable={editable}
                    text={item.name}
                    handleTextChange={handleSectionNameChange}
                    type="SubHeader"
                    paddingHorizontal="s"
                />
                <Editable
                    editable={editable}
                    text={item.description}
                    handleTextChange={handleSectionDescriptionChange}
                    paddingHorizontal="s"
                    numberOfLines={2}
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
