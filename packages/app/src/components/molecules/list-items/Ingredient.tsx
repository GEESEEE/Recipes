import React from 'react'
import styled from 'styled-components'
import { RecipeIngredient } from '@recipes/api-types/v1'
import { useNavigation } from '@react-navigation/native'
import ListItem from './ListItem'
import { View } from '@/components/base'
import { Editable } from '@/components/atoms'
import { utils } from '@/utils'
import { ListItemBaseProps } from '@/types'
import { useAppDispatch } from '@/hooks'
import { editRecipeActions } from '@/redux'

interface IngredientListItemProps extends ListItemBaseProps<RecipeIngredient> {
    handleIngredientNameChange?: (text: string) => void
    handleIngredientAmountChange?: (text: string) => void
    handleIngredientUnitChange?: (text: string) => void
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
                    numberOfLines={1}
                    placeholder="Ingredient Name"
                />
                <SubContainer>
                    <Editable
                        editable={editable}
                        text={item.amount.toString()}
                        handleTextChange={handleIngredientAmountChange}
                        paddingHorizontal="s"
                        numberOfLines={1}
                    />
                    <FlexEditable
                        editable={editable}
                        text={item.ingredient.unit ?? ''}
                        handleTextChange={handleIngredientUnitChange}
                        placeholder="Unit?"
                        numberOfLines={1}
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
const FlexEditable = styled(Editable)`
    flex: 1;
`
