import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
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
                contentContainerStyle={styles.recipeListItem}
                renderItem={({ item }) => (
                    <View>
                        <RecipeHeader
                            recipe={item}
                            navigation={navigation}
                            editable={false}
                        >
                            <ButtonFilled
                                text="edit"
                                onPress={() => navigation.navigate('CreateRecipe', { item })}
                                />
                            <ButtonFilled text="delete" onPress={dispatch(deleteRecipe(item))} />

                        </RecipeHeader>
                    </View>

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

const RecipesList = styled(FlatList as new () => FlatList<Recipe>)``

const styles = StyleSheet.create({
    recipeListItem: {},
})
