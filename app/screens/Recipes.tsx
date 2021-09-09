import React from 'react'
import { View } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
import RecipesFlatList from '../components/data/RecipesFlatList'
import { applySearch } from '../config/utils'
import { useAppSelector } from '../hooks/redux'

function RecipesScreen({
    navigation,
}: {
    navigation: NavigationScreenProp<string>
}): JSX.Element {
    const recipes = useAppSelector((state) => state.myRecipes)

    const search = navigation.state.params?.search
    const filteredRecipes = applySearch(recipes, search)

    return (
        <Container>
            <RecipesFlatList
                recipes={filteredRecipes}
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
