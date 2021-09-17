import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native'
import React from 'react'
import {  View } from 'react-native'
import styled from 'styled-components'
import { RecipeSectionList } from '../components/data'
import { handleNumericTextInput } from '../config/utils'
import { Recipe } from '../data'

function ViewRecipeScreen({ navigation }: { navigation: any }): JSX.Element {
    const nav = useNavigation()
    console.log("navvv", nav)
    const route = useRoute()
    console.log("R", route)
    const state = useNavigationState(s => s)
    console.log("ViewRecipe", state)
    // Shouldnt pass the recipe,
    // should pass recipe Id and whether its from browseRecipes or myRecipes and grab it from there
    const {recipe}: {recipe: Recipe} = route.params
    console.log("Re", recipe)

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
