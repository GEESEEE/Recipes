import React, { useEffect } from 'react'
import { StyleSheet, View, BackHandler, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyButton from '../components/MyButton'
import colors from '../config/colors'
import { signOut } from '../actions/auth'
import { retrieveRecipes } from '../actions/recipes'

function MainScreen({ navigation }: { navigation: any }): JSX.Element {
    const recipes = useSelector((state: any) => state.recipes)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(retrieveRecipes())
    }, [])

    function logRecipes(): void {
        console.log('Logging Recipes')
        console.log(recipes)
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }, [])

    function handleBackButton(): boolean {
        console.log('Back button pressed')
        return true;
    }




    function handleDrawer(): void {
        navigation.openDrawer()
    }

    return (
        <View style={styles.background}>
            <Text>main screen</Text>
            <MyButton text="Log recipes" onPress={logRecipes} />
            <MyButton text="Drawer" onPress={handleDrawer} />
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
