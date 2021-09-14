import React, { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { ButtonIcon, FeatherButton } from '../../user-input/Buttons'
import SearchBarComponent from './Search'
import { getRecipes } from '../../../actions/browse-recipes'

const Header = ({ navigation }: { navigation: any }): JSX.Element => {
    const dispatch = useAppDispatch()
    const globalState = useAppSelector((state) => state)

    const { theme, settings, browseSearch, browseSort } = globalState
    const { routeName } = navigation.state
    const insets = useSafeAreaInsets()
    const sort = browseSort.sortState

    const searchRoutes = ['Main', 'Recipes']
    const [openSearchBar, setOpenSearchBar] = useState(false)
    const [searchText, setSearchText] = useState('')

    const displayFilter = searchRoutes.includes(routeName)
    const displaySearch = routeName === 'Main' || !openSearchBar
    const displayAdd = ['Recipes'].includes(routeName) && !openSearchBar

    function toggleSearch(): void {
        setOpenSearchBar(!openSearchBar)
    }

    function searchDatabase(): void {
        dispatch(
            getRecipes(
                { scopes: ['published'], search: browseSearch, sort })
        )
    }

    const backgroundColor = settings.invertedColors
        ? theme.primary
        : theme.background
    const iconColor = settings.invertedColors ? theme.background : theme.primary

    return (
        <Container
            style={{
                height: insets.top + 35,
                backgroundColor,
            }}
        >
            <HeaderContainer
                style={{
                    paddingTop: insets.top,
                    paddingLeft: insets.left + 5,
                    paddingRight: insets.right + 5,
                    backgroundColor,
                }}
            >
                {openSearchBar ? (
                    <SearchBarComponent
                        navigation={navigation}
                        toggle={() => toggleSearch()}
                        searchText={searchText}
                        setText={setSearchText}
                    />
                ) : (
                    <HeaderFlex>
                        <FeatherButton
                            iconName="menu"
                            onPress={() => navigation.toggleDrawer()}
                            color={iconColor}
                        />
                    </HeaderFlex>
                )}

                {/* Search Button */}
                {displaySearch ? (
                    <ButtonIcon
                        onPress={() =>
                            openSearchBar ? searchDatabase() : toggleSearch()
                        }
                        icon={
                            <MaterialIcons
                                name="search"
                                size={30}
                                color={iconColor}
                            />
                        }
                    />
                ) : null}

                {/* Filter button */}
                {displayFilter ? (
                    <FeatherButton
                        iconName="filter"
                        onPress={() =>
                            navigation.navigate('Sort', { route: routeName })
                        }
                        size={25}
                        color={iconColor}
                    />
                ) : null}

                {/* Create Recipe Button */}
                {displayAdd ? (
                    <FeatherButton
                        iconName="plus"
                        onPress={() => navigation.navigate('EditRecipe')}
                        color={iconColor}
                    />
                ) : null}
            </HeaderContainer>
        </Container>
    )
}

export default Header

const Container = styled(View)`
    border-bottom-color: ${(props) => props.theme.primary};
    border-bottom-width: 1px;
`

const HeaderContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const HeaderFlex = styled(View)`
    flex: 1;
    align-items: flex-start;
`
