import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import RecipesFlatList from '../components/data/RecipesFlatList'
import RecipesListHeader from '../components/data/RecipesListHeader'
import { applySearch, applySort } from '../config/recipes'
import { useAppSelector } from '../hooks/redux'

function RecipesScreen(): JSX.Element {
    const {myRecipes, mySearch, mySort} = useAppSelector((state) => state)


    const filteredRecipes = applySearch(myRecipes, mySearch)
    const sortedRecipes = applySort(filteredRecipes, mySort.sortState)

    const displayHeader = mySearch.length > 0 || mySort.sortState.length > 0

    return (
        <Container>
            <RecipesListHeader display={displayHeader} />
            <RecipesFlatList
                recipes={sortedRecipes}
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
