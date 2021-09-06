import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { retrieveRecipes } from '../actions/recipes'
import { setColor } from '../actions/theme'
import { ButtonFilled } from '../components/user-input/Buttons'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import * as recipeService from '../rest/recipe'

function MainScreen({ navigation }: { navigation: any }): JSX.Element {
    const recipes = useAppSelector((state) => state.recipes)
    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(retrieveRecipes())
    }, [])

    function logRecipes(): void {
        console.log('Recipes', recipes)
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

    async function scopes(): Promise<void> {
        console.log('Scopes')
        const r = await recipeService.getRecipes(['published'])
        console.log(r.length)
    }

    return (
        <Container>
            <SampleText>Main Screen</SampleText>
            <ButtonFilled text="Log recipes" onPress={logRecipes} />
            <ButtonFilled text="Drawer" onPress={handleDrawer} />
            <ButtonFilled
                text="Change Primary Color"
                onPress={changePrimaryColor}
            />
            <ButtonFilled text="do some scopes" onPress={scopes}/>
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
