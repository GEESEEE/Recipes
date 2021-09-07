import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useAppSelector } from '../../../hooks/redux'
import { ButtonIcon, FeatherButton } from '../../user-input/Buttons'
import SearchBarComponent from './Search'

const Header = ({ navigation }: { navigation: any }): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)
    const { routeName } = navigation.state
    const insets = useSafeAreaInsets()

    const searchRoutes = ['Main', 'RecipesScreen']
    const [openSearchBar, setOpenSearchBar] = useState(false)

    const displaySearch =
        searchRoutes.includes(routeName) &&
        (routeName === 'Main' || !openSearchBar)

    const displayFilter = searchRoutes.includes(routeName)
    const displayAdd = ['RecipesScreen'].includes(routeName) && !openSearchBar

    function handleDrawer(): void {
        navigation.toggleDrawer()
    }

    function handleCreateRecipe(): void {
        navigation.navigate('EditRecipe')
    }

    function toggleSearch(): void {
        if (openSearchBar) {
            navigation.setParams({ search: '' })
        }
        setOpenSearchBar(!openSearchBar)
    }

    function handleSearch(): void {
        console.log('Handle Search')
    }

    function handleFilter(): void {
        console.log('Filterr')
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
                {openSearchBar ? (
                    <SearchBarComponent
                        navigation={navigation}
                        toggle={toggleSearch}
                    />
                ) : (
                    <HeaderFlex>
                        <FeatherButton iconName="menu" onPress={handleDrawer} />
                    </HeaderFlex>
                )}

                {/* Search Button */}
                {displaySearch ? (
                    <ButtonIcon
                        onPress={openSearchBar ? handleSearch : toggleSearch}
                        icon={
                            <MaterialIcons
                                name="search"
                                size={30}
                                color={theme.primary}
                            />
                        }
                    />
                ) : null}

                {displayFilter ? (
                    <FeatherButton
                        iconName="filter"
                        onPress={handleFilter}
                        size={25}
                    />
                ) : null}

                {/* Create Recipe Button */}
                {displayAdd ? (
                    <FeatherButton
                        iconName="plus"
                        onPress={handleCreateRecipe}
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

const HeaderFlex = styled(View)`
    flex: 1;
    align-items: flex-start;
`
