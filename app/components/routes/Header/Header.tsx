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
    const globalState = useAppSelector(state => state)

    const {theme } = globalState
    const { routeName } = navigation.state
    const insets = useSafeAreaInsets()

    const searchRoutes = ['Main', 'Recipes']
    const [openSearchBar, setOpenSearchBar] = useState(false)
    const [searchText, setSearchText] = useState('')

    const displayFilter = searchRoutes.includes(routeName)
    const displaySearch = searchRoutes.includes(routeName)
    const displayAdd = ['Recipes'].includes(routeName) && !openSearchBar

    const search = routeName === 'Main' ? globalState.browseSearch : globalState.mySearch
    const sortState = routeName === 'Main' ? globalState.browseSort : globalState.mySort
    const sort = sortState.sortState

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

    function searchDatabase(): void {
        dispatch(getRecipes({ scopes: ['published'], search, sort }))
    }

    function handleFilter(): void {
        navigation.navigate('Sort', { route: routeName })
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
                        toggle={() => toggleSearch()}
                        searchText={searchText}
                        setText={setSearchText}
                    />
                ) : (
                    <HeaderFlex>
                        <FeatherButton
                            iconName="menu"
                            onPress={() => handleDrawer()}
                        />
                    </HeaderFlex>
                )}

                {/* Search Button */}
                {displaySearch ? (
                    <ButtonIcon
                        onPress={() => openSearchBar ? searchDatabase() : toggleSearch()}
                        icon={
                            <MaterialIcons
                                name="search"
                                size={30}
                                color={theme.primary}
                            />
                        }
                    />
                ) : null}

                {/* Filter button */}
                {displayFilter ? (
                    <FeatherButton
                        iconName="filter"
                        onPress={() => handleFilter()}
                        size={25}
                    />
                ) : null}

                {/* Create Recipe Button */}
                {displayAdd ? (
                    <FeatherButton
                        iconName="plus"
                        onPress={() => handleCreateRecipe()}
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
