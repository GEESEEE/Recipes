import React from 'react'
import { View, TouchableOpacity, TextInput, FlatList } from 'react-native'
import styled from 'styled-components'

import { MyFeather } from '../Icons'
import { RecipeIngredient } from '../../data'
import { useAppSelector } from '../../hooks/redux'
import { HeaderBordered } from '../HeaderBordered'
import { ButtonBorderless } from '../user-input/Buttons'

const IngredientsList = ({
    ingredients,
    handleIngredientNameChange,
    handleIngredientAmountChange,
    handleIngredientUnitChange,
    handleRemoveIngredient,
    handleAddIngredient
}: {
    handleAddIngredient: () => void
    handleIngredientNameChange: (key: string, text: string) => void
    handleIngredientAmountChange: (key: string, text: string) => void
    handleIngredientUnitChange: (key: string, text: string) => void
    handleRemoveIngredient: (key: string) => void
    ingredients: RecipeIngredient[]
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)
    return (
        <HeaderBordered headerText="Ingredients">
            <List
                data={ingredients}
                keyExtractor={item => item.ingredient!.id.toString()}
                renderItem={({ item}) => (
                    <ItemContainer>
                        {/* Ingredient Name Input */}
                        <NameText
                            onChangeText={
                                (text: string) => handleIngredientNameChange(item.ingredient!.id.toString(), text)}
                            value={item.ingredient?.name}
                            placeholder="New Ingredient"
                            placeholderTextColor={theme.grey}
                            multiline
                        />

                        {/* Ingredient Amount Input */}
                        <AmountText
                            onChangeText={
                                (text: string) => handleIngredientAmountChange(item.ingredient!.id.toString(), text)}
                            keyboardType='decimal-pad'
                            value={item.amount.toString()}
                            placeholder="0"
                            placeholderTextColor={theme.grey}
                            multiline
                        />

                        {/* Ingredient Unit Input */}
                        <UnitText
                            onChangeText={
                                (text: string) => handleIngredientUnitChange(item.ingredient!.id.toString(), text)}
                            value={item.ingredient?.unit?.toString() ?? ''}
                            placeholder="Unit?"
                            placeholderTextColor={theme.grey}
                            multiline
                        />

                        {/* Remove Ingredient Button */}
                        <RemoveButton onPress={() => handleRemoveIngredient(item.ingredient!.id.toString())}>
                            <MyFeather name="minus" size={15} color={theme.text} />
                        </RemoveButton>
                    </ItemContainer>
                )}
            />
            <ButtonBorderless text="Add Ingredient" onPress={handleAddIngredient} />
        </HeaderBordered>



    )
}

export default IngredientsList

const List = styled(FlatList as new () => FlatList<RecipeIngredient>)`
    padding-top: 5px;
    flex-direction: column;
`

const ItemContainer = styled(View)`
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
