import React from 'react'
import styled from 'styled-components'
import { RecipeIngredient } from '@recipes/api-types/v1'
import { useNavigation } from '@react-navigation/native'
import ListItem from './ListItem'
import { View } from '@/components/base'
import { Editable } from '@/components/atoms'
import { ListItemBaseProps } from '@/types'
import { useAppDispatch, useIngredientDropdownItems, useToggle } from '@/hooks'
import { editRecipeActions } from '@/redux'

interface IngredientListItemProps extends ListItemBaseProps<RecipeIngredient> {
    handleIngredientNameChange?: (text: string) => void
    handleIngredientAmountChange?: (text: string) => void
    handleIngredientUnitChange?: (text: string) => void
}

function IngredientListItem({
    item,
    useDropdown,
    onGesture,
    editable,
    releaseHeight,
    hide,
    handleIngredientNameChange,
    handleIngredientAmountChange,
    handleIngredientUnitChange,
}: IngredientListItemProps): JSX.Element {
    const dropdownItems = useIngredientDropdownItems(item)

    const [focusAmount, toggleFocusAmount] = useToggle(false)
    const [focusUnit, toggleFocusUnit] = useToggle(false)

    return (
        <ListItem
            items={useDropdown ? dropdownItems : undefined}
            onGesture={onGesture}
            hide={hide}
        >
            <Container>
                <Editable
                    releaseHeight={releaseHeight}
                    editable={editable}
                    text={item.ingredient.name}
                    handleTextChange={handleIngredientNameChange}
                    paddingHorizontal="s"
                    numberOfLines={1}
                    placeholder="Ingredient Name"
                    onSubmitEditing={() => toggleFocusAmount()}
                />
                <SubContainer>
                    <Editable
                        releaseHeight={releaseHeight}
                        editable={editable}
                        text={item.amount.toString()}
                        handleTextChange={handleIngredientAmountChange}
                        paddingHorizontal="s"
                        numberOfLines={1}
                        focus={focusAmount}
                        onSubmitEditing={() => toggleFocusUnit()}
                    />
                    <FlexEditable
                        releaseHeight={releaseHeight}
                        editable={editable}
                        text={item.ingredient.unit ?? ''}
                        handleTextChange={handleIngredientUnitChange}
                        placeholder="Unit?"
                        numberOfLines={1}
                        focus={focusUnit}
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
