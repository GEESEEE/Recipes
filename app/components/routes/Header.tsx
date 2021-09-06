import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useAppSelector } from '../../hooks/redux'
import { ButtonIcon } from '../user-input/Buttons'

const FeatherButton = ({
    iconName,
    onPress,
    size,
}: {
    iconName: string
    onPress: () => void
    size?: number
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)
    return (
        <ButtonIcon
            onPress={onPress}
            icon={
                <Feather
                    name={iconName}
                    size={size || 30}
                    color={theme.primary}
                />
            }
        />
    )
}

const Header = ({ navigation }: { navigation: any }): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)
    const { routeName } = navigation.state
    const insets = useSafeAreaInsets()

    const [openSearchBar, setOpenSearchBar] = useState(false)

    function handleDrawerButton(): void {
        navigation.toggleDrawer()
    }

    function handleCreateRecipeButton(): void {
        navigation.navigate('EditRecipe')
    }

    function toggleSearchButton(): void {
        if (openSearchBar) {
            navigation.setParams({ search: '' })
        }
        setOpenSearchBar(!openSearchBar)
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
                <FeatherButton iconName="menu" onPress={handleDrawerButton} />

                {/* Search Bar */}
                {openSearchBar ? (
                    <SearchBarComponent navigation={navigation} />
                ) : (
                    <HeaderTitle />
                )}

                {/* Search Button */}
                <ButtonIcon
                    onPress={toggleSearchButton}
                    icon={
                        <MaterialIcons
                            name="search"
                            size={30}
                            color={theme.primary}
                        />
                    }
                />

                {/* Create Recipe Button */}
                {routeName === 'RecipesScreen' ? (
                    <FeatherButton
                        iconName="plus"
                        onPress={handleCreateRecipeButton}
                    />
                ) : null}
            </HeaderContainer>
        </Container>
    )
}

export default Header

const SearchBarComponent = ({
    navigation,
}: {
    navigation: any
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)

    const [text, setText] = useState('')

    function handleText(search: string): void {
        setText(search)
        navigation.setParams({ search })
    }

    return (
        <SearchBarContainer>
            <SearchBar
                placeholder="Search"
                placeholderTextColor={theme.grey}
                onChangeText={(t: string) => handleText(t)}
                value={text}
            />
            <ClearSearchBarButton
                iconName="x"
                onPress={() => handleText('')}
                size={25}
            />
        </SearchBarContainer>
    )
}

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

const SearchBarContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => props.theme.backgroundVariant};
    border-radius: 10px;
    margin-end: 5px;
    margin-left: 10px;
`

const SearchBar = styled(TextInput)`
    flex: 1;
    color: ${(props) => props.theme.text};
    padding-left: 8px;
    padding-right: 8px;
`

const ClearSearchBarButton = styled(FeatherButton)`
    align-self: flex-end;
    padding-right: 10px;
`
