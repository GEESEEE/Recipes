import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'
import { useAppSelector } from '../types/ReduxHooks'
import { ButtonFilled } from './Buttons'

export const BottomTab = ({
    navigation,
}: {
    navigation: any
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)

    function mainButton(): void {
        navigation.navigate('Main')
    }

    function recipesButton(): void {
        navigation.navigate('RecipesScreen')
    }

    return (
        <Container>
            <ButtonContainer>
                <ButtonFilled text="Main" onPress={mainButton}/>
            </ButtonContainer>

            <ButtonContainer>
                <ButtonFilled text="Recipes" onPress={recipesButton}/>
            </ButtonContainer>
        </Container>
    )
}

const Container = styled(View)`
    height: 70px;
    background-color: ${(props) => props.theme.primary};
    flex-direction: row;
    align-items: center;
`
const ButtonContainer = styled(View)`
    width: 50%;
`

