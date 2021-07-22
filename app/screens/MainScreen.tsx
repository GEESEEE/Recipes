import React from 'react'
import { StyleSheet, View, Text} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import MyButton from '../components/MyButton'
import colors from '../config/colors'
import { RECIPEACTIONS, RecipesContext} from '../contexts/recipes'
import { AUTHACTIONS } from '../reducers/auth'
import * as authService from '../services/auth'


function MainScreen({ navigation }: { navigation: any}): JSX.Element {
    const auth = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()

    const recipesContext = React.useContext(RecipesContext)
    function logRecipes(): void {
        console.log('Logging Recipes')
        console.log(recipesContext.recipes)
    }

    async function signOut(): Promise<void> {
        const res = await authService.signOut({token: auth.token})
        console.log("signout response", res)
        if (!res) {
            console.log('Couldnt log out for some reason')
        } else {
            await SecureStore.deleteItemAsync('token')
            dispatch({type: AUTHACTIONS.SIGN_OUT})
            navigation.goBack()
        }
    }

    function clearRecipes(): void {
        recipesContext.dispatch({type: RECIPEACTIONS.SET, payload: {recipes: []}} )
    }

    return (
        <View style={styles.background}>
            <Text>main screen</Text>
            <MyButton
                text='Log recipes'
                onPress={logRecipes}
            />
            <MyButton
                text='Sign Out'
                onPress={signOut}
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
