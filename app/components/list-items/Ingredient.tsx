import React from 'react'
import { View, TouchableOpacity, TextInput } from 'react-native'
import styled from 'styled-components'

import { MyFeather } from '../Icons'
import { RecipeIngredient } from '../../data'
import { useAppSelector } from '../../hooks/redux'

const IngredientListItem = ({
    item,
    onChangeName,
    onChangeAmount,
    onChangeUnit,
    onRemove,
}: {
    onChangeName: (key: string, text: string) => void
    onChangeAmount: (key: string, text: string) => void
    onChangeUnit: (key: string, text: string) => void
    onRemove: (key: string) => void
    item: RecipeIngredient
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)
    return (
        <Container key={item.key}>
            {/* Ingredient Name Input */}
            <NameText
                onChangeText={(text: string) => onChangeName(item.key, text)}
                value={item.ingredient?.name}
                placeholder="New Ingredient"
                placeholderTextColor={theme.grey}
                multiline
            />

            {/* Ingredient Amount Input */}
            <AmountText
                onChangeText={(text: string) => onChangeAmount(item.key, text)}
                keyboardType='decimal-pad'
                // value={item.amount.toString()}
                placeholder="0"
                placeholderTextColor={theme.grey}
                multiline
            />

            {/* Ingredient Unit Input */}
            <UnitText
                onChangeText={(text: string) => onChangeUnit(item.key, text)}
                value={item.ingredient?.unit?.toString() ?? ''}
                placeholder="Unit?"
                placeholderTextColor={theme.grey}
                multiline
            />

            {/* Remove Ingredient Button */}
            <RemoveButton onPress={() => onRemove(item.key)}>
                <MyFeather name="minus" size={15} color={theme.text} />
            </RemoveButton>
        </Container>
    )
}

export default IngredientListItem

const Container = styled(View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const NameText = styled(TextInput)`
    width: 55%;
    padding-end: 5px;
    color: ${(props) => props.theme.text};
`

const AmountText = styled(TextInput)`
    width: 15%;
    padding-end: 5px;
    color: ${(props) => props.theme.text};
`

const UnitText = styled(TextInput)`
    width: 20%;
    padding-end: 5px;
    color: ${(props) => props.theme.text};
`

const RemoveButton = styled(TouchableOpacity)`
    align-content: flex-end;
`
