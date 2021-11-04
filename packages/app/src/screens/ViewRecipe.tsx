import React from 'react'
import styled from 'styled-components'
import { useRoute } from '@react-navigation/native'
import { Recipe } from '@recipes/api-types/v1'
import { View, Text } from '@/components/base'
import { useSettings, useHeader, useRecipes } from '@/hooks'

type ViewRecipeProps = {
    navigation: any
}

function ViewRecipeScreen({ navigation }: ViewRecipeProps): JSX.Element {
    const { theme } = useSettings()
    const recipes = useRecipes()

    const route = useRoute() as {
        params?: { sectionId: number; recipeId: number }
    }

    let sectionId = -1
    let recipeId = -1
    if (typeof route.params !== 'undefined') {
        recipeId = route.params.recipeId
        sectionId = route.params.sectionId
    }

    let passedRecipe: Recipe | undefined
    const sectionRecipes = recipes[sectionId]
    if (typeof sectionRecipes !== 'undefined') {
        passedRecipe = sectionRecipes.find((recipe) => recipe.id === recipeId)
    }

    console.log('ViewRecipe', passedRecipe)

    useHeader(navigation, {
        title:
            typeof passedRecipe !== 'undefined'
                ? passedRecipe.name
                : 'View Recipe',
        right: [],
    })

    return (
        <Container backgroundColor={theme.background}>
            <Text> Yes</Text>
        </Container>
    )
}

export default ViewRecipeScreen

const Container = styled(View)`
    flex: 1;
`
