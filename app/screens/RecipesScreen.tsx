import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import RecipeListItemComponent from '../components/RecipeListItemComponent'
import colors from '../config/colors'

function RecipesScreen(): JSX.Element {
    const recipes = useSelector((state: any) => state.recipes)

    return (
        <View style={styles.background}>
            <Text>recipes screen</Text>
            <FlatList
                style={styles.recipesList}
                contentContainerStyle={styles.recipeListItemContainer}
                data={recipes}
                renderItem={({ item }) => (
                    <RecipeListItemComponent recipe={item} />
                )}
            />
        </View>
    )
}

export default RecipesScreen

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    recipesList: {
        width: '100%',
    },
    recipeListItemContainer: {
        alignItems: 'center',
        marginLeft: 10,
        width: '100%',
    },
})
