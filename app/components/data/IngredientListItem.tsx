/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { TextInput } from 'react-native'
import styled from 'styled-components'
import { RecipeIngredient } from '../../data'
import { useAppSelector } from '../../hooks'
import ListItemWrapper from './ListItem'

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
}: IngredientListItemProps): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)

    return (
        <ListItemWrapper
            list={ingredients}
            item={ingredient}
            editable={editable}
            handleRemove={handleRemoveIngredient}
        >
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
                    maxLength={255}
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
                    maxLength={5}
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
                        maxLength={8}
                    />
                ) : null}
        </ListItemWrapper>
    )
}

export default IngredientListItem


const NameText = styled(TextInput)`
    width: 60%;
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
