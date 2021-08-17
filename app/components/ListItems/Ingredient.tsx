import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { MyFeather } from '../Icons'
import { Ingredient } from '../../data'


const IngredientListItem = (
    {
        ingredientsData,
        item,
        onChangeName,
        onChangeAmount,
        onChangeUnit,
        onRemove,
    }
        :
    {
        onChangeName: (key: string, text: string) => void,
        onChangeAmount: (key: string, text: string) => void,
        onChangeUnit: (key: string, text: string) => void,
        onRemove: (key: string) => void
        ingredientsData: Ingredient[]
        item: Ingredient
    }
): JSX.Element => {
    const theme = useSelector((state: any) => state.theme)

    return (
        <Container key={item.key}>
                    {/* Ingredient Name Input */}
                    <NameText
                        onChangeText={(text: string) =>
                            onChangeName(item.key, text)
                        }
                        value={item.name}
                        placeholder="New Ingredient"
                        placeholderTextColor={theme.grey}
                    />

                    {/* Ingredient Amount Input */}
                    <AmountText
                        onChangeText={(text: string) =>
                            onChangeAmount(item.key, text)
                        }
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
                        onChangeText={(text: string) =>
                            onChangeUnit(item.key, text)
                        }
                        // value={item.unit}
                        placeholder="Unit"
                        placeholderTextColor={theme.grey}
                    />

                    {/* Remove Ingredient Button */}
                    <RemoveButton
                        onPress={() => onRemove(item.key)}
                    >
                        <MyFeather name="minus" size={15} color={theme.text}/>
                    </RemoveButton>
                </Container>
    )
}

export default IngredientListItem

const Container = styled(View)`
    flexDirection: row;
    justifyContent: center;
    alignItems: center;
    width: 100%;
`

const NameText = styled(TextInput)`
    width: 50%;
    paddingEnd: 5px;
    color: ${(props) => props.theme.text}
`

const AmountText = styled(TextInput)`
    width: 15%;
    paddingEnd: 5px;
    color: ${(props) => props.theme.text}
`

const UnitText = styled(TextInput)`
    width: 25%;
    paddingEnd: 5px;
    color: ${(props) => props.theme.text}
`

const RemoveButton = styled(TouchableOpacity)`
    alignContent: flex-end;
`

