import React from 'react'
import { View } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
import RecipesFlatList from '../components/data/RecipesFlatList'
import {SortHeader} from '../components/user-input/search'
import { applySearch, applySort } from '../config/recipes'
import { useAppSelector } from '../hooks/redux'

function RecipesScreen({
    navigation,
}: {
    navigation: NavigationScreenProp<string>
}): JSX.Element {
    const recipes = useAppSelector((state) => state.myRecipes)
    const sortState = useAppSelector((state) => state.mySort)
    const sort = sortState.sortState

    const search = navigation.state.params?.search
    const filteredRecipes = applySearch(recipes, search)
    const sortedRecipes = applySort(filteredRecipes, sort)

    return (
        <Container>
            <SortHeader route="Recipes" />
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
