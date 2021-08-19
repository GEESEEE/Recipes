import React from 'react'
import { View, TouchableOpacity, TextInput } from 'react-native'
import styled from 'styled-components'

import { MyFeather } from '../Icons'
import { Ingredient } from '../../data'
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
    item: Ingredient
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)

    return (
        <Container key={item.key}>
            {/* Ingredient Name Input */}
            <NameText
                onChangeText={(text: string) => onChangeName(item.key, text)}
                value={item.name}
                placeholder="New Ingredient"
                placeholderTextColor={theme.grey}
            />

            {/* Ingredient Amount Input */}
            <AmountText
                onChangeText={(text: string) => onChangeAmount(item.key, text)}
                // value={
                //     item.recipeIngredients![0].amount
                //         ? item.recipeIngredients![0].amount.toString()
                //         : ''
                // }
                placeholder="0"
                placeholderTextColor={theme.grey}
            />

            {/* Ingredient Unit Input */}
            <UnitText
                onChangeText={(text: string) => onChangeUnit(item.key, text)}
                // value={item.unit}
                placeholder="Unit?"
                placeholderTextColor={theme.grey}
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
    width: 50%;
    padding-end: 5px;
    color: ${(props) => props.theme.text};
`

const AmountText = styled(TextInput)`
    width: 15%;
    padding-end: 5px;
    color: ${(props) => props.theme.text};
`

const UnitText = styled(TextInput)`
    width: 25%;
    padding-end: 5px;
    color: ${(props) => props.theme.text};
`

const RemoveButton = styled(TouchableOpacity)`
    align-content: flex-end;
`
