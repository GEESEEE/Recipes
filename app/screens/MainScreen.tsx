import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { retrieveRecipes } from '../actions/recipes'
import { setColor } from '../actions/theme'
import { ButtonFilled } from '../components/Buttons'

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
            <ButtonFilled text="Log recipes" onPress={logRecipes} />
            <ButtonFilled text="Drawer" onPress={handleDrawer} />
            <ButtonFilled text="Change Primary Color" onPress={changePrimaryColor} />
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
