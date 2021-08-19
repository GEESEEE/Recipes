import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { retrieveRecipes } from '../actions/recipes'
import { setColor } from '../actions/theme'
import { ButtonFilled } from '../components/user-input/buttons'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

function MainScreen({ navigation }: { navigation: any }): JSX.Element {
    const recipes = useAppSelector((state) => state.recipes)
    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(retrieveRecipes())
    }, [])

    function logRecipes(): void {
        console.log(recipes.length, 'Recipes')
    }

    function changePrimaryColor(): void {
        if (theme.primary === '#4ecdc4') {
            dispatch(setColor('#fc5c65'))
        } else {
            dispatch(setColor('#4ecdc4'))
        }
    }

    function handleDrawer(): void {
        navigation.openDrawer()
    }

    return (
        <Container>
            <SampleText >Main Screen</SampleText>
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
    background-color: ${(props) => props.theme.background};
`

const SampleText = styled(Text)`
    color: ${(props) => props.theme.primary}
    font-size: 20px;
    border-color: ${(props) => props.theme.primary}
    border-width: 1px;
`
