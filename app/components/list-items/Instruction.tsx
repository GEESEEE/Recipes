import React from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import styled from 'styled-components'

import { MyFeather } from '../Icons'
import { Instruction } from '../../data'
import { useAppSelector } from '../../hooks/redux'
import { HeaderBordered } from '../HeaderBordered'
import { ButtonBorderless } from '../user-input/Buttons'

const InstructionsList = ({
    instructions,
    handleInstructionTextChange,
    handleRemoveInstruction,
    handleAddInstruction,
}: {
    handleAddInstruction: () => void
    handleInstructionTextChange: (key: string, text: string) => void
    handleRemoveInstruction: (key: string) => void
    instructions: Instruction[]
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)
    return (
        <HeaderBordered headerText="Instructions">
            <List
                data={instructions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Container>
                        {/* Instruction Number */}
                        <Number>
                            {(instructions.indexOf(item) + 1).toString()}
                        </Number>

                        {/* Instruction Text Input */}
                        <InstructionText
                            onChangeText={(text: string) =>
                                handleInstructionTextChange(
                                    item.id.toString(),
                                    text
                                )
                            }
                            value={item.text}
                            placeholder="Text"
                            placeholderTextColor={theme.grey}
                            multiline
                        />

                        {/* Remove Instruction Button */}
                        <RemoveButton
                            onPress={() =>
                                handleRemoveInstruction(item.id.toString())
                            }
                        >
                            <MyFeather
                                name="minus"
                                size={15}
                                color={theme.text}
                            />
                        </RemoveButton>
                    </Container>
                )}
            />
            <ButtonBorderless
                text="Add Instruction"
                onPress={handleAddInstruction}
            />
        </HeaderBordered>
    )
}

export default InstructionsList

const List = styled(FlatList as new () => FlatList<Instruction>)`
    padding-top: 5px;
    flex-direction: column;
`

const Container = styled(View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    width: 100%;
`

const Number = styled(Text)`
    width: 10%;
    font-size: 18px;
    color: ${(props) => props.theme.text};
`

const InstructionText = styled(TextInput)`
    width: 80%;
    padding-end: 5px;
    color: ${(props) => props.theme.text};
`

const RemoveButton = styled(TouchableOpacity)``
