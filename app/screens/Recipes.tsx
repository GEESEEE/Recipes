import React from 'react'
import { View } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
import RecipesFlatList from '../components/data/RecipesFlatList'
import { FilterHeader, SortHeader } from '../components/user-input/search'
import { applySearch, applySort } from '../config/recipes'
import { useAppSelector } from '../hooks/redux'

function RecipesScreen({
    navigation,
}: {
    navigation: NavigationScreenProp<string>
}): JSX.Element {
    const globalState = useAppSelector((state) => state)
    const recipes = globalState.myRecipes

    const search = globalState.mySearch
    const sortState = globalState.mySort
    const sort = sortState.sortState

    const filteredRecipes = applySearch(recipes, search)
    const sortedRecipes = applySort(filteredRecipes, sort)

    const displaySeparator = search.length > 0 || sort.length > 0

    return (
        <Container>
            <FilterHeader route="Recipes" />
            <SortHeader route="Recipes" />
            {displaySeparator ? <Separator /> : null}
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

const Separator = styled(View)`
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.primary};
`
