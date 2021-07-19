import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import RecipeListItemComponent from '../components/RecipeListItemComponent'
import colors from '../config/colors'
import { RecipesContext } from '../contexts/recipes'

function RecipesScreen(): JSX.Element {

    const recipesContext = React.useContext(RecipesContext)
    return (
        <View style={styles.background}>
            <Text>recipes screen</Text>
            <FlatList style={styles.recipesList}
                data={recipesContext.recipes}
                renderItem={({item}) => (
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

    }
})
