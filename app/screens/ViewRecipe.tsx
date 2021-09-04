import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import {RecipeSectionList} from '../components/data'
import { handleNumericTextInput } from '../config/utils'
import { Recipe } from '../data'

function ViewRecipeScreen({ navigation }: { navigation: any }): JSX.Element {
    const recipe: Recipe = navigation.state.params?.recipe

    const people = recipe.peopleCount === 0 ? 1 : recipe.peopleCount
    const [recipeData, setRecipeData] = React.useState<Recipe>(
        JSON.parse(JSON.stringify(recipe))
    )

    function handlePeopleCountChange(peopleCount: string): void {
        const val = handleNumericTextInput(peopleCount, true)
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
                navigation={navigation}
                action='View'
                handlePeopleCountChange={handlePeopleCountChange}
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
