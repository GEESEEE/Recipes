import React from 'react'
import {  FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationScreenProp } from 'react-navigation'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { ButtonFilled } from '../components/Buttons'
import {RecipeListItem} from '../components/ListItems'
import { Recipe } from '../data'

function RecipesScreen({navigation }: { navigation: NavigationScreenProp<string>}): JSX.Element {
    const recipes: Recipe[] = useSelector((state: any) => state.recipes)

    function handleCreateRecipe(): void {
        navigation.navigate('CreateRecipe')
    }

    return (
        <Container>
            <ButtonFilled text="Create New Recipe" onPress={handleCreateRecipe}/>
            <RecipesList
                data={recipes}
                renderItem={({ item }) => (
                    <RecipeListItem recipe={item} />
                )}
            />
        </Container>

    )
}

export default RecipesScreen

const Container = styled(SafeAreaView)`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${(props) => props.theme.background}
`

const RecipesList = styled(FlatList)`
    width: 100%;
`
