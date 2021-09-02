import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
import { RecipeHeader } from '../components/data'
import { ButtonFilled } from '../components/user-input/Buttons'
import { Recipe } from '../data'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { deleteRecipe } from '../actions/recipes'

function RecipesScreen({
    navigation,
}: {
    navigation: NavigationScreenProp<string>
}): JSX.Element {
    const recipes = useAppSelector((state) => state.recipes)
    const dispatch = useAppDispatch()

    return (
        <Container>
            <RecipesList
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.contentContainer}
                renderItem={({ item }) => (
                    <RecipeHeader
                        recipe={item}
                        navigation={navigation}
                        editable='Edit-none'
                        dropdown
                        onPress={() => navigation.navigate('ViewRecipe', { recipe: item })}
                    />
                )}
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

const RecipesList = styled(FlatList as new () => FlatList<Recipe>)`
    width: 100%;
`

const styles = StyleSheet.create({
    contentContainer: {
        // alignItems: 'center',
        paddingTop: 25,
    },
})
