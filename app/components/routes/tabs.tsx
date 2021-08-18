import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { ButtonProps, ButtonFlex } from '../user-input/buttons'

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
            <Separator/>
            <RouteTab text="Recipes" onPress={recipesButton}/>
        </Container>
    )
}

export default BottomTab

const RouteTab = (
    {text, onPress} : ButtonProps
): JSX.Element => (
        <ButtonContainer>
            <ButtonFlex
                onPress={onPress}
                text={text}
            />
        </ButtonContainer>
    )

const Container = styled(View)`
    height: 50px;
    background-color: ${(props) => props.theme.background};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-top-width: 1px;
    border-top-color: ${(props) => props.theme.primary}
`
const ButtonContainer = styled(View)`
   flex: 1
`

const Separator = styled(View)`
    height: 100%;
    width: 1px;
    background-color: ${(props) => props.theme.primary};
`



