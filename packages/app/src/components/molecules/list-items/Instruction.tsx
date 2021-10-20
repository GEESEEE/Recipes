import React from 'react'
import styled from 'styled-components'
import { Instruction } from '@recipes/api-types/v1'
import { ListItemBaseProps } from './base'
import { View, Text } from '@/components/base'
import { ListItem, Editable } from '@/components/atoms'
import { utils } from '@/utils'

interface InstructionListItemProps extends ListItemBaseProps<Instruction> {
    instructions: Instruction[]
    editable?: boolean
    handleInstructionTextChange?: (key: string, text: string) => void
}

function InstructionListItem({
    item,
    instructions,
    editable,
    handleInstructionTextChange,
}: InstructionListItemProps): JSX.Element {
    const index = instructions.indexOf(item)

    function logInstruction(): void {
        console.log('Logging instruction')
    }

    return (
        <ListItem
            items={utils.createDropDownItems([logInstruction], 'instruction')}
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
