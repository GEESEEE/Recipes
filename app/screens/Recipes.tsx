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

    console.log(search, sort)

    const filteredRecipes = applySearch(recipes, search)
    const sortedRecipes = applySort(filteredRecipes, sort)
    console.log(sortedRecipes)
    const displayHeader = search.length > 0 || sort.length > 0

    return (
        <Container>
            <RecipesListHeader display={displayHeader} />
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
