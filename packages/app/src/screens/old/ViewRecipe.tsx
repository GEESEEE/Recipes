import { useRoute } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { RecipeSectionList } from '@/components/data'
import { utils } from '@/utils'
import { Recipe } from '@/data'

function ViewRecipeScreen(): JSX.Element {
    const route = useRoute()
    const { recipe } = route.params as {
        recipe: Recipe
    }

    const people = recipe.peopleCount === 0 ? 1 : recipe.peopleCount
    const [recipeData, setRecipeData] = React.useState<Recipe>(
        JSON.parse(JSON.stringify(recipe))
    )

    function handlePeopleCountChange(peopleCount: string): void {
        const val = utils.handleNumericTextInput(peopleCount, true)
        recipeData.peopleCount = val
        recipeData.recipeIngredients!.forEach((tempRi) => {
            const existRi = recipe.recipeIngredients!.find(
                (ri) => ri.id === tempRi.id
            )
            if (typeof existRi !== 'undefined') {
                const multiplier = recipeData.peopleCount / people
                tempRi.amount = existRi.amount * multiplier
            }
        })
        setRecipeData({ ...recipeData })
    }

    return (
        <Container>
            <RecipeSectionList
                recipe={recipeData}
                action="View"
                handlePeopleCountChange={(text: string) =>
                    handlePeopleCountChange(text)
                }
            />
        </Container>
    )
}

export default ViewRecipeScreen

const Container = styled(View)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: ${(props) => props.theme.background};
`
