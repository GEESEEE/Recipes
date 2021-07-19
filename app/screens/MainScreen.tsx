import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MyButton from '../components/MyButton'
import colors from '../config/colors'
import { RecipesContext } from '../contexts/recipes'

function MainScreen(): JSX.Element {
    const recipesContext = React.useContext(RecipesContext)
    function logRecipes(): void {
        console.log('Logging Recipes')
        console.log(recipesContext.recipes)
    }

    return (
        <View style={styles.background}>
            <Text>main screen</Text>
            <MyButton
                text='Log recipes'
                onPress={logRecipes}
            />
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },

})
