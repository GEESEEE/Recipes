import React from 'react'
import styled from 'styled-components'
import { Section } from '@recipes/api-types/v1'
import { View, Text } from '@/components/base'
import { ListItem, Editable } from '@/components/atoms'
import { utils } from '@/utils'

type SectionListItemProps = {
    item: Section
    editable?: boolean
    handleSectionNameChange?: (key: string, text: string) => void
    handleSectionDescriptionChange?: (key: string, text: string) => void
}

function SectionListItem({
    item: item,
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
                    paddingHorizontal="s"
                />
                <Editable
                    editable={editable}
                    text={item.description}
                    handleTextChange={handleSectionDescriptionChange}
                    paddingHorizontal="s"
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
