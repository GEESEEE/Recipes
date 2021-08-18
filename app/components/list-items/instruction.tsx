import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import styled from 'styled-components'

import { MyFeather } from '../icons'
import { Instruction } from '../../data'
import { useAppSelector } from '../../types/ReduxHooks'

const InstructionListItem = ({
    instructionsData,
    item,
    onChangeText,
    onRemove,
}: {
    onChangeText: (key: string, text: string) => void
    onRemove: (key: string) => void
    instructionsData: Instruction[]
    item: Instruction
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)

    return (
        <Container key={item.key}>
            {/* Instruction Number */}
            <Number>{(instructionsData.indexOf(item) + 1).toString()}</Number>

            {/* Instruction Text Input */}
            <InstructionText
                onChangeText={(text: string) => onChangeText(item.key, text)}
                value={item.text}
                placeholder="Text"
                placeholderTextColor={theme.grey}
                multiline
            />

            {/* Remove Instruction Button */}
            <RemoveButton onPress={() => onRemove(item.key)}>
                <MyFeather name="minus" size={15} color={theme.text} />
            </RemoveButton>
        </Container>
    )
}

export default InstructionListItem

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
