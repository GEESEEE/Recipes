import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
import { ButtonFilled } from '../components/buttons'
import { RecipeListItem } from '../components/list-items'
import { Recipe } from '../data'
import { useAppSelector } from '../types/ReduxHooks'

function RecipesScreen({
    navigation,
}: {
    navigation: NavigationScreenProp<string>
}): JSX.Element {
    const recipes = useAppSelector((state) => state.recipes)

    function handleCreateRecipe(): void {
        navigation.navigate('CreateRecipe')
    }

    return (
        <Container>
            <ButtonFilled
                text="Create New Recipe"
                onPress={handleCreateRecipe}
            />
            <RecipesList
                data={recipes}
                renderItem={({ item }) => (
                    <RecipeListItem recipe={item as Recipe} />
                )}
            />
        </Container>
    )
}

export default RecipesScreen

const Container = styled(SafeAreaView)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
`

const RecipesList = styled(FlatList)`
    width: 100%;
`
