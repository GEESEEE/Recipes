import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import MyButton from '../components/MyButton'
import colors from '../config/colors'
import { retrieveRecipes } from '../actions/recipes'
import { setColor } from '../actions/theme'

function MainScreen({ navigation }: { navigation: any }): JSX.Element {
    const recipes = useSelector((state: any) => state.recipes)
    const theme = useSelector((state: any) => state.theme)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(retrieveRecipes())
    }, [])

    function logRecipes(): void {
        console.log('Logging Recipes')
        console.log(recipes)
    }

    function changePrimaryColor(): void {
        console.log('Changing primary color')
        if (theme.primary === '#4ecdc4') {
            dispatch(setColor('#fc5c65'))
        } else {
            dispatch(setColor('#4ecdc4'))
        }
    }


    // Makes the back button do absolutely nothing
    // useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    // }, [])

    // function handleBackButton(): boolean {
    //     console.log('Back button pressed')
    //     return true;
    // }




    function handleDrawer(): void {
        navigation.openDrawer()
    }

    return (
        <Container>
            <Text>main screen</Text>
            <MyButton text="Log recipes" onPress={logRecipes} />
            <MyButton text="Drawer" onPress={handleDrawer} />
            <MyButton text="Change Primary Color" onPress={changePrimaryColor} />
        </Container>
    )
}

export default MainScreen

const Container = styled(View)`
    flex: 1px;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${(props) => props.theme.background}
`

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
})
