/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components'
import { Instruction } from '../../data'
import { useAppSelector } from '../../hooks'
import { MyFeather } from '../Icons'

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
    const theme = useAppSelector((state) => state.theme)
    const index = instructions.indexOf(instruction)
    let listSize = instructions.length - 1
    if (editable) listSize += 1

    return (
        <Container
            style={{
                borderBottomWidth: index === listSize ? 3 : 0,
                borderBottomLeftRadius: index === listSize ? 20 : 0,
                borderBottomRightRadius: index === listSize ? 20 : 0,
                paddingBottom: index === listSize ? 5 : 0,
            }}
        >
            <ItemContainer>
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
            </ItemContainer>

            {/* Remove Instruction Button */}
            {editable ? (
                <RemoveButton
                    onPress={() =>
                        handleRemoveInstruction
                            ? handleRemoveInstruction(instruction.id.toString())
                            : undefined
                    }
                >
                    <MyFeather name="minus" size={20} color={theme.text} />
                </RemoveButton>
            ) : null}
        </Container>
    )
}

export default InstructionListItem

const Container = styled(View)`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    border-left-width: 3px;
    border-right-width: 3px;
    border-color: ${(props) => props.theme.primary};
    border-bottom-color: ${(props) => props.theme.primary};
`

const ItemContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
`

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

const RemoveButton = styled(TouchableOpacity)`
    align-content: flex-end;
    padding: 3px;
`
