import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import RecipesFlatList from '../components/data/RecipesFlatList'
import RecipesListHeader from '../components/data/RecipesListHeader'
import { applySearch, applySort } from '../config/recipes'
import { useAppSelector } from '../hooks/redux'

function RecipesScreen({ navigation }: { navigation: any }): JSX.Element {
    const globalState = useAppSelector((state) => state)
    const recipes = globalState.myRecipes

    const search = globalState.mySearch
    const sortState = globalState.mySort
    const sort = sortState.sortState

    const filteredRecipes = applySearch(recipes, search)
    const sortedRecipes = applySort(filteredRecipes, sort)

    return (
        <Container>
            <RecipesListHeader route="Recipes" search={search} sort={sort} />
            <RecipesFlatList
                recipes={sortedRecipes}
                navigation={navigation}
                dropdown
            />
        </Container>
    )
}

export default RecipesScreen

const Container = styled(View)`
    flex: 1;
    background-color: ${(props) => props.theme.background};
    align-items: center;
`
