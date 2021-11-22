import React from 'react'
import styled from 'styled-components'
import { Instruction } from '@recipes/api-types/v1'
import ListItem from './ListItem'
import { View, Text } from '@/components/base'
import { Editable } from '@/components/atoms'
import { ListItemBaseProps } from '@/types'
import { useInstructionDropdownItems } from '@/hooks'

interface InstructionListItemProps extends ListItemBaseProps<Instruction> {
    instructions: Instruction[]
    handleInstructionTextChange?: (text: string) => void
}

function InstructionListItem({
    item,
    useDropdown,
    onGesture,
    editable,
    releaseHeight,
    hide,
    instructions,
    handleInstructionTextChange,
}: InstructionListItemProps): JSX.Element {
    const index = instructions.indexOf(item)
    const dropdownItems = useInstructionDropdownItems(item)

    return (
        <ListItem
            items={useDropdown ? dropdownItems : undefined}
            onGesture={onGesture}
            hide={hide}
        >
            <Container paddingHorizontal="s">
                <Number type="SubHeader">{index + 1}</Number>
                <FlexEditable
                    releaseHeight={releaseHeight}
                    editable={editable}
                    text={item.text}
                    handleTextChange={handleInstructionTextChange}
                    numberOfLines={2}
                    placeholder="Instruction Text"
                />
            </Container>
        </ListItem>
    )
}

export default InstructionListItem

const Container = styled(View)`
    flex-direction: row;
    align-items: center;
`

const Number = styled(Text)`
    width: 10%;
`

const FlexEditable = styled(Editable)`
    flex: 1;
`
