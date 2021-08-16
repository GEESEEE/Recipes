import React from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationScreenProp } from 'react-navigation'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import MyButton from '../components/MyButton'
import RecipeListItemComponent from '../components/RecipeListItemComponent'
import colors from '../config/colors'

function RecipesScreen({navigation }: { navigation: NavigationScreenProp<string>}): JSX.Element {
    const recipes = useSelector((state: any) => state.recipes)

    function handleCreateRecipe(): void {
        navigation.navigate('CreateRecipe')
    }

    return (
        <Container>
            <Text>recipes screen</Text>
            <MyButton text="Create New Recipe" onPress={handleCreateRecipe}/>
            <FlatList
                style={styles.recipesList}
                contentContainerStyle={styles.recipeListItemContainer}
                data={recipes}
                renderItem={({ item }) => (
                    <RecipeListItemComponent recipe={item} />
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

const styles = StyleSheet.create({
    recipesList: {
        width: '100%',
    },
    recipeListItemContainer: {
        alignItems: 'center',
        marginLeft: 10,
        width: '100%',
    },
})
