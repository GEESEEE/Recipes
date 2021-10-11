import React from 'react'
import styled from 'styled-components'
import { useIsFocused } from '@react-navigation/native'
import { Instruction } from '@/data'
import { View, Text } from '@/components/base'
import { ListItem, Editable } from '@/components/atoms'
import { utils } from '@/config'
import { useDropdownRerender, usePosition, useToggle } from '@/hooks'

type InstructionListItemProps = {
    instruction: Instruction
    instructions: Instruction[]
    editable?: boolean
    handleInstructionTextChange?: (key: string, text: string) => void
}

function InstructionListItem({
    instruction,
    instructions,
    editable,
    handleInstructionTextChange,
}: InstructionListItemProps): JSX.Element {
    const index = instructions.indexOf(instruction)

    function logInstruction(): void {
        console.log('Logging instruction')
    }

    return (
        <ListItem
            items={utils.createDropDownItems([logInstruction], 'instruction')}
        >
            <Container >
                <Number type="SubHeader" paddingHorizontal="s" >
                    {index + 10}
                </Number>
                <Editable
                    editable={editable}
                    text={instruction.text}
                    handleTextChange={handleInstructionTextChange}
                    numberOfLines={3}
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
