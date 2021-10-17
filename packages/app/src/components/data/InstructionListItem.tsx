/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { TextInput, Text } from 'react-native'
import styled from 'styled-components'
import ListItemWrapper from './ListItem'
import { Instruction } from '@/data'
import { useAppSelector } from '@/hooks'

type InstructionListItemProps = {
    instruction: Instruction
    instructions: Instruction[]
    editable: boolean
    handleInstructionTextChange?: (key: string, text: string) => void
    handleRemoveInstruction?: (key: string) => void
}

const InstructionListItem = ({
    instruction,
    instructions,
    editable,
    handleInstructionTextChange,
    handleRemoveInstruction,
}: InstructionListItemProps): JSX.Element => {
    const { theme } = useAppSelector((state) => state.settings)
    const index = instructions.indexOf(instruction)

    return (
        <ListItemWrapper
            list={instructions}
            item={instruction}
            editable={editable}
            handleRemove={handleRemoveInstruction}
        >
            {/* Instruction Number */}
            <Number>{(index + 1).toString()}</Number>

            {/* Instruction Text Input */}
            <InstructionText
                onChangeText={(text: string) =>
                    handleInstructionTextChange
                        ? handleInstructionTextChange(
                              instruction.id.toString(),
                              text
                          )
                        : undefined
                }
                value={instruction.text}
                placeholder="Text"
                placeholderTextColor={theme.grey}
                multiline
                editable={editable}
                maxLength={255}
            />
        </ListItemWrapper>
    )
}

export default InstructionListItem

const Number = styled(Text)`
    width: 10%;
    font-size: 16px;
    padding-end: 5px;
    color: ${(props) => props.theme.text};
`

const InstructionText = styled(TextInput)`
    width: 90%;
    padding-end: 5px;
    color: ${(props) => props.theme.text};
`
