import React from 'react'
import styled from 'styled-components'
import { Instruction } from '@/data'
import { View, TextInput, Text } from '@/components/base'
import { ListItem } from '@/components/atoms'
import { utils } from '@/config'

type InstructionListItemProps = {
    instruction: Instruction
    instructions: Instruction[]
}

function InstructionListItem({
    instruction,
    instructions,
}: InstructionListItemProps): JSX.Element {
    const index = instructions.indexOf(instruction)

    function logInstruction(): void {
        console.log('Logging instruction')
    }

    const [text, setText] = React.useState('')

    return (
        <ListItem
            items={utils.createDropDownItems([logInstruction], 'instruction')}
        >
            <Container>
                <Number type="SubHeader" paddingHorizontal="s">
                    {index + 10}
                </Number>
                <InstructionTextInput
                    value={text}
                    multiline
                    numberOfLines={2}
                    onChangeText={(t: string) => setText(t)}
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

const InstructionTextInput = styled(TextInput)`
    flex: 1;
`
