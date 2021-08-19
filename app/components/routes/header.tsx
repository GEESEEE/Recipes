import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components'
import Feather from 'react-native-vector-icons/Feather'
import { useAppSelector } from '../../hooks/redux'


const ButtonIcon = ({
    onPress,
    icon
}: {
    onPress: () => void
    icon: JSX.Element
}):JSX.Element => (
    <TouchableOpacity onPress={onPress}>
        {icon}
    </TouchableOpacity>
)

const Header = ({
    navigation,
}: {
    navigation: any
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)
    const { routeName } = navigation.state

    function handleDrawerButton(): void {
        navigation.toggleDrawer()
    }

    function handleCreateRecipeButton(): void {
        navigation.navigate('CreateRecipe')
    }

    return (
        <Container>
            <HeaderContainer>
                <ButtonIcon
                    onPress={handleDrawerButton}
                    icon={<Feather name="menu" size={30} color={theme.primary} />}
                />

                <HeaderTitle>Header</HeaderTitle>

                {routeName === 'RecipesScreen'
                    ?   <ButtonIcon
                            onPress={handleCreateRecipeButton}
                            icon={<Feather name="plus" size={30} color={theme.primary} />}
                        />
                    : null
                }
            </HeaderContainer>
        </Container>
    )
}

export default Header


const Container = styled(View)`
    height: 80px;
    padding-top: 45px;
    background-color: ${(props) => props.theme.background};
    border-bottom-color: ${(props) => props.theme.primary};
    border-bottom-width: 1px;
`

const HeaderContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
    margin-right: 15px;
    background-color: ${(props) => props.theme.background};
`

const HeaderTitle = styled(Text)`
    padding-left: 10px;
    flex: 1;
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => props.theme.primary};
    letter-spacing: 1px;
`
