import React from 'react'
import styled from 'styled-components'
import { RecipeIngredient } from '@recipes/api-types/v1'
import { useNavigation } from '@react-navigation/native'
import { View, Text } from '@/components/base'
import { ListItem, Editable } from '@/components/atoms'
import { utils } from '@/utils'
import { ListItemBaseProps } from '@/types'
import { useAppDispatch } from '@/hooks'
import { editRecipeActions } from '@/redux'

interface IngredientListItemProps extends ListItemBaseProps<RecipeIngredient> {
    handleIngredientNameChange?: (key: string, text: string) => void
    handleIngredientAmountChange?: (key: string, text: string) => void
    handleIngredientUnitChange?: (key: string, text: string) => void
}

function IngredientListItem({
    item,
    dropdownItems,
    onGesture,
    editable,
    handleIngredientNameChange,
    handleIngredientAmountChange,
    handleIngredientUnitChange,
}: IngredientListItemProps): JSX.Element {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()

    dropdownItems = dropdownItems || []

    function logIngredient(): void {
        console.log('Logging ingredient', item.ingredient.name)
    }

    function editIngredient(): void {
        navigation.navigate('EditIngredient', { ingredientId: item.id })
    }

    function deleteIngredient(): void {
        dispatch(editRecipeActions.removeIngredient({ id: item.id }))
    }

    dropdownItems.push(logIngredient, editIngredient, deleteIngredient)

    return (
        <ListItem
            items={
                !editable
                    ? utils.createDropDownItems(dropdownItems, 'ingredient')
                    : undefined
            }
            onGesture={onGesture}
        >
            <Container>
                <Editable
                    editable={editable}
                    text={item.ingredient.name}
                    handleTextChange={handleIngredientNameChange}
                    paddingHorizontal="s"
                />
                <SubContainer>
                    <Editable
                        editable={editable}
                        text={item.amount.toString()}
                        handleTextChange={handleIngredientAmountChange}
                        paddingHorizontal="s"
                    />
                    <Editable
                        editable={editable}
                        text={item.ingredient.unit ?? ''}
                        handleTextChange={handleIngredientUnitChange}
                        width="m"
                    />
                </SubContainer>
            </Container>
        </ListItem>
    )
}

export default IngredientListItem

const Container = styled(View)`
    flex-direction: column;
    justify-content: center;
`

const SubContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`
