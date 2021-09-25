import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { RecipesFlatList, RecipesListHeader } from '@/components/data'
import { recipeUtils } from '@/config'
import { useAppSelector } from '@/hooks'

function RecipesScreen(): JSX.Element {
    const { myRecipes, mySearch, mySort } = useAppSelector((state) => state)

    const filteredRecipes = recipeUtils.applySearch(myRecipes.recipes, mySearch)
    const sortedRecipes = recipeUtils.applySort(
        filteredRecipes,
        mySort.sortState
    )

    const displayHeader = mySearch.length > 0 || mySort.sortState.length > 0

    return (
        <Container>
            <RecipesListHeader display={displayHeader} />
            <RecipesFlatList recipes={sortedRecipes} dropdown />
        </Container>
    )
}

export default RecipesScreen

const Container = styled(View)`
    flex: 1;
    background-color: ${(props) => props.theme.background};
    align-items: center;
`
