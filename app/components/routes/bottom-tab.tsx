import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { ButtonFilled } from '../buttons'

const BottomTab = ({
    navigation,
}: {
    navigation: any
}): JSX.Element => {

    function mainButton(): void {
        navigation.navigate('Main')
    }

    function recipesButton(): void {
        navigation.navigate('RecipesScreen')
    }

    return (
        <Container>
            <RouteTab text="Main" onPress={mainButton}/>
            <RouteTab text="Recipes" onPress={recipesButton}/>
        </Container>
    )
}

export default BottomTab

const RouteTab = (
    {text, onPress} : {
        text: string
        onPress: () => void
    }
): JSX.Element => (
        <ButtonContainer>
            <ButtonFilled text={text} onPress={onPress}/>
        </ButtonContainer>
    )

const Container = styled(View)`
    height: 70px;
    background-color: ${(props) => props.theme.primary};
    flex-direction: row;
    align-items: center;
`
const ButtonContainer = styled(View)`
    width: 50%;
`

