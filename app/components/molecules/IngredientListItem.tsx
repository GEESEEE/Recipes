import React from 'react'
import styled from 'styled-components'
import { RecipeIngredient } from '@/data'
import { View, Text } from '@/components/base'
import { ListItem, Editable } from '@/components/atoms'
import { utils } from '@/config'

type IngredientListItemProps = {
    ingredient: RecipeIngredient
    ingredients: RecipeIngredient[]
    editable?: boolean
    handleIngredientNameChange?: (key: string, text: string) => void
    handleIngredientAmountChange?: (key: string, text: string) => void
    handleIngredientUnitChange?: (key: string, text: string) => void
}

function IngredientListItem({
    ingredient,
    ingredients,
    editable,
    handleIngredientNameChange,
    handleIngredientAmountChange,
    handleIngredientUnitChange,
}: IngredientListItemProps): JSX.Element {

    function logIngredient(): void {
        console.log('Logging ingredient')
    }

    return (
        <ListItem
            items={utils.createDropDownItems([logIngredient], 'ingredient')}
        >
            <Container >
                <Editable
                    editable={editable}
                    text={ingredient.ingredient?.name}
                    handleTextChange={handleIngredientNameChange}

                />
                <SubContainer>
                    <Editable
                        editable={editable}
                        text={ingredient.amount.toString()}
                        handleTextChange={handleIngredientAmountChange}
                    />
                    <Editable
                        editable={editable}
                        text={ingredient.ingredient?.unit}
                        handleTextChange={handleIngredientUnitChange}
                    />
                </SubContainer>
            </Container>
        </ListItem>
    )
}

export default IngredientListItem

const Container = styled(View)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    border-width: 1px;
    border-color: ${(props) => props.theme.primary}
`

const SubContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`
