import React from 'react'
import styled from 'styled-components'

import {
    Copy,
    Ingredient,
    Recipe,
    RecipeIngredient,
} from '@recipes/api-types/v1'
import { View, Text } from '@/components/base'
import { useAppSelector, useHeader, useSearch } from '@/hooks'
import { applySearch } from '@/utils'

const recipes = [
    new Recipe(1, '1', '1', 1, 1, [
        new RecipeIngredient(1, 1, 1, new Ingredient(1, '1', 'g')),
    ]),
    new Recipe(2, '2', '2', 2, 2, [
        new RecipeIngredient(2, 2, 2, new Ingredient(2, '2', 'g')),
    ]),
]

function BrowseScreen({ navigation }: { navigation: any }): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    useHeader(navigation, { drawer: true, search: true, right: [] })

    const search = useSearch()

    const filtered = applySearch<Recipe>(
        recipes,
        [search],
        ['name', 'description', 'recipeIngredients.ingredient.name']
    )

    console.log('filtered', filtered)

    return (
        <Container backgroundColor={theme.background}>
            <Text>Browse screen toch</Text>
        </Container>
    )
}

export default BrowseScreen

const Container = styled(View)`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`
