import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
import { RecipeListItem } from '../components/list-items'
import { Recipe } from '../data'
import { useAppSelector } from '../types/ReduxHooks'

function RecipesScreen({
    navigation,
}: {
    navigation: NavigationScreenProp<string>
}): JSX.Element {
    const recipes = useAppSelector((state) => state.recipes)

    return (
        <Container>
            <RecipesList
                data={recipes}
                contentContainerStyle={styles.recipeListItem}
                renderItem={({ item }) => (
                    <RecipeListItem recipe={item} />
                )}
            />
        </Container>
    )
}

export default RecipesScreen

const Container = styled(View)`
    flex: 1;
    background-color: ${(props) => props.theme.background};
`

const RecipesList = styled(FlatList as new () => FlatList<Recipe>)`

`

const styles = StyleSheet.create({
    recipeListItem: {

    }
})



