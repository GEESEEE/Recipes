import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { IngredientsList, InstructionsList, RecipeHeader } from '../components/data'
import { handleNumericTextInput } from '../config/utils'
import { Recipe } from '../data'


function ShowRecipeScreen({ navigation }: { navigation: any }): JSX.Element {
    const recipe: Recipe = navigation.state.params?.recipe

    const people = recipe.peopleCount === 0 ? 1 : recipe.peopleCount
    const [recipeData, setRecipeData] = React.useState<Recipe>(JSON.parse(JSON.stringify(recipe)))

    function handlePeopleCountChange(peopleCount: string): void {
        const val = handleNumericTextInput(peopleCount, true)
        recipeData.peopleCount = val
        recipeData.recipeIngredients!.forEach(tempRi => {
            const existRi = recipe.recipeIngredients!.find(ri => ri.id === tempRi.id)
            if (typeof existRi !== 'undefined') {
                const multiplier = recipeData.peopleCount / people
                tempRi.amount = existRi.amount * multiplier
            }
        })
        setRecipeData({ ...recipeData })
    }

    return (
        <Container>
            <RecipeHeader
                recipe={recipeData}
                navigation={navigation}
                editable='Edit-people'
                handlePeopleCountChange={handlePeopleCountChange}
            />

            <IngredientsList
                ingredients={recipeData.recipeIngredients!}
                editable={false}
            />
            <InstructionsList
                instructions={recipeData.instructions!}
                editable={false}
            />
        </Container>
    )
}

export default ShowRecipeScreen

const Container = styled(View)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: ${(props) => props.theme.background};
`
