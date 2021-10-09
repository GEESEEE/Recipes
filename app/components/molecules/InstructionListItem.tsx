import React from 'react'
import styled from 'styled-components'
import { Instruction } from '@/data'
import { View, TextInput, Text } from '@/components/base'
import { ListItem } from '@/components/atoms'

type InstructionListItemProps = {
    instruction: Instruction
    instructions: Instruction[]
}

function InstructionListItem({
    instruction,
    instructions
}: InstructionListItemProps): JSX.Element {
    const index = instructions.indexOf(instruction)
    console.log("IListItem", instructions.length, instruction, index)
    return (
        <ListItem
            functions={[]}
            functionSuffix='instruction'
        >
            <Container width='l'>
                <Text type='SubHeader' paddingHorizontal='s'>{index + 1}</Text>
                <InstructionTextInput
                    value={instruction.text}
                />
            </Container>
        </ListItem>
    )
}

export default InstructionListItem

const Container = styled(View)`
    flex-direction: row;
`

const Number = styled(Text)`

`

const InstructionTextInput = styled(TextInput)`
    flex: 8;
`
