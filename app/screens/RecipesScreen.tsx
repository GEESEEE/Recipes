import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import RecipeListItemcomponent from '../components/RecipeListItemComponent'
import colors from '../config/colors'
import { RecipesContext } from '../contexts/recipes'

function RecipesScreen(): JSX.Element {

    const recipesContext = React.useContext(RecipesContext)
    return (
        <View style={styles.background}>
            <Text>recipes screen</Text>
            <FlatList style={styles.recipesList}
                // keyExtractor={item => item.name}
                data={recipesContext.recipes}
                renderItem={({item}) => (
                    <RecipeListItemcomponent recipe={item} />
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
