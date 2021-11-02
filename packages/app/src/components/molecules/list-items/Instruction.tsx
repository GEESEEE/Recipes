import React from 'react'
import styled from 'styled-components'
import { Instruction } from '@recipes/api-types/v1'
import { View, Text } from '@/components/base'
import { ListItem, Editable } from '@/components/atoms'
import { utils } from '@/utils'
import { ListItemBaseProps } from '@/types'

interface InstructionListItemProps extends ListItemBaseProps<Instruction> {
    instructions: Instruction[]
    handleInstructionTextChange?: (key: string, text: string) => void
}

function InstructionListItem({
    item,
    dropdownItems,
    onGesture,
    editable,
    instructions,
    handleInstructionTextChange,
}: InstructionListItemProps): JSX.Element {
    const index = instructions.indexOf(item)

    dropdownItems = dropdownItems || []

    function logInstruction(): void {
        console.log('Logging instruction', item.text)
    }

    dropdownItems.push(logInstruction)

    return (
        <ListItem
            items={
                !editable
                    ? utils.createDropDownItems(dropdownItems, 'instruction')
                    : undefined
            }
            onGesture={onGesture}
        >
            <Container paddingHorizontal="s">
                <Number type="SubHeader">{index + 1}</Number>
                <Editable
                    editable={editable}
                    text={item.text}
                    handleTextChange={handleInstructionTextChange}
                    numberOfLines={2}
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
