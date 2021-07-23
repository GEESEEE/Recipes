import React from 'react'
import * as SecureStore from 'expo-secure-store'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyButton from '../components/MyButton'
import colors from '../config/colors'
import { signOut } from '../actions/auth'
import { retrieveRecipes } from '../actions/recipes'
import * as recipeService from '../services/recipe'

function MainScreen({ navigation }: { navigation: any }): JSX.Element {
    const auth = useSelector((state: any) => state.auth)
    const recipes = useSelector((state: any) => state.recipes)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(retrieveRecipes())
    }, [])

    function logRecipes(): void {
        console.log('Logging Recipes')
        // console.log(recipes)
    }

    async function clearRecipes(): Promise<void> {
        await AsyncStorage.setItem('recipes', JSON.stringify([]))
    }


    async function handleSignOut(): Promise<void> {
        dispatch(signOut(auth.token, navigation))
    }

    return (
        <View style={styles.background}>
            <Text>main screen</Text>
            <MyButton text="Log recipes" onPress={logRecipes} />
            <MyButton text="Sign Out" onPress={handleSignOut} />
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
