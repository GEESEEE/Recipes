import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { retrieveRecipes } from '../actions/recipes'
import { setColor } from '../actions/theme'
import { ButtonFilled } from '../components/Buttons'
import { useAppDispatch, useAppSelector } from '../types/ReduxHooks'

function MainScreen({ navigation }: { navigation: any }): JSX.Element {
    const recipes = useAppSelector((state) => state.recipes)
    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()


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
            <ButtonFilled text="Log recipes" onPress={logRecipes} />
            <ButtonFilled text="Drawer" onPress={handleDrawer} />
            <ButtonFilled text="Change Primary Color" onPress={changePrimaryColor} />
        </Container>
    )
}

export default MainScreen

const Container = styled(View)`
    flex: 1px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.background}
`
