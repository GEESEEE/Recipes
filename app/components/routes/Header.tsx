import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import Feather from 'react-native-vector-icons/Feather'
import { useAppSelector } from '../../hooks/redux'

const ButtonIcon = ({
    onPress,
    icon,
}: {
    onPress: () => void
    icon: JSX.Element
}): JSX.Element => <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>

const Header = ({ navigation }: { navigation: any }): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)
    const { routeName } = navigation.state
    const insets = useSafeAreaInsets()

    function handleDrawerButton(): void {
        navigation.toggleDrawer()
    }

    function handleCreateRecipeButton(): void {
        navigation.navigate('EditRecipe')
    }

    return (
        <Container style={{ height: insets.top + 35 }}>
            <HeaderContainer
                style={{
                    paddingTop: insets.top,
                    paddingLeft: insets.left + 5,
                    paddingRight: insets.right + 5,
                }}
            >
                <ButtonIcon
                    onPress={handleDrawerButton}
                    icon={
                        <Feather name="menu" size={30} color={theme.primary} />
                    }
                />

                <HeaderTitle/>

                {routeName === 'RecipesScreen' ? (
                    <ButtonIcon
                        onPress={handleCreateRecipeButton}
                        icon={
                            <Feather
                                name="plus"
                                size={30}
                                color={theme.primary}
                            />
                        }
                    />
                ) : null}
            </HeaderContainer>
        </Container>
    )
}

export default Header

const Container = styled(View)`
    background-color: ${(props) => props.theme.background};
    border-bottom-color: ${(props) => props.theme.primary};
    border-bottom-width: 1px;
`

const HeaderContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.background};
`

const HeaderTitle = styled(Text)`
    flex: 1;
    padding-left: 10px;
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => props.theme.primary};
    letter-spacing: 1px;
`
