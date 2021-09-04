/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { RecipeIngredient } from '../../data'
import { useAppSelector } from "../../hooks"
import { MyFeather } from '../Icons'

type IngredientListItemProps = {
    ingredient: RecipeIngredient
    ingredients: RecipeIngredient[]
    editable: boolean
    handleIngredientNameChange?: (key: string, text: string) => void
    handleIngredientAmountChange?: (key: string, text: string) => void
    handleIngredientUnitChange?: (key: string, text: string) => void
    handleRemoveIngredient?: (key: string) => void
}

const IngredientListItem = ({
    ingredient,
    ingredients,
    editable,
    handleIngredientNameChange,
    handleIngredientAmountChange,
    handleIngredientUnitChange,
    handleRemoveIngredient,
}: IngredientListItemProps ): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)
    const index = ingredients.indexOf(ingredient)
    let listSize = ingredients.length - 1
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

                {/* Ingredient Name Input */}
                <NameText
                    onChangeText={(text: string) =>
                        handleIngredientNameChange
                            ? handleIngredientNameChange(
                                    ingredient.id.toString(),
                                    text
                                )
                            : undefined
                    }
                    value={ingredient.ingredient?.name}
                    placeholder="New Ingredient"
                    placeholderTextColor={theme.grey}
                    multiline
                    editable={editable}
                />

                {/* Ingredient Amount Input */}
                <AmountText
                    style={{
                        color:
                            ingredient.amount === 0 ? theme.grey : theme.text,
                    }}
                    onChangeText={(text: string) =>
                        handleIngredientAmountChange
                            ? handleIngredientAmountChange(
                                    ingredient.id.toString(),
                                    text
                                )
                            : undefined
                    }
                    keyboardType="decimal-pad"
                    value={ingredient.amount.toString()}
                    placeholder="0"
                    placeholderTextColor={theme.grey}
                    multiline
                    editable={editable}
                />

                {/* Ingredient Unit Input */}
                {editable || ingredient.ingredient?.unit ? (
                    <UnitText
                        onChangeText={(text: string) =>
                            handleIngredientUnitChange
                                ? handleIngredientUnitChange(
                                        ingredient.id.toString(),
                                        text
                                    )
                                : undefined
                        }
                        value={ingredient.ingredient?.unit?.toString() ?? ''}
                        placeholder="Unit?"
                        placeholderTextColor={theme.grey}
                        multiline
                        editable={editable}
                    />
                ) : null}

            </ItemContainer>

            {/* Remove Ingredient Button */}
            {editable ? (
                <RemoveButton
                    onPress={() =>
                        handleRemoveIngredient
                            ? handleRemoveIngredient(
                                    ingredient.id.toString()
                                )
                            : undefined
                    }
                >
                    <MyFeather
                        name="minus"
                        size={20}
                        color={theme.text}
                    />
                </RemoveButton>
            ) : null}
        </Container>
    )
}

export default IngredientListItem

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
    flex: 9;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
`

const NameText = styled(TextInput)`
    width: 70%;
    padding-end: 5px;
    color: ${(props) => props.theme.text};
`

const AmountText = styled(TextInput)`
    width: 15%;
    padding-end: 5px;
    color: ${(props) => props.theme.text};
`

const UnitText = styled(TextInput)`
    width: 15%;
    padding-end: 5px;
    color: ${(props) => props.theme.text};
`

const RemoveButton = styled(TouchableOpacity)`
    align-content: flex-end;
    padding: 3px;
`
