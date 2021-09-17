import React, { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { useNavigationState, useRoute } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useAppDispatch, useAppSelector, useToggle } from '../../../hooks'
import { ButtonIcon, FeatherButton } from '../../user-input/Buttons'
import SearchBarComponent from './Search'
import { getRecipes } from '../../../actions/browse-recipes'
import Sort from '../../user-input/search/SortModal'

const Config: {[key: string]: any} = {
    Browse: {
        filter: true,
        search: true,
        add: false,
    },
    Recipes: {
        filter: true,
        search: false,
        add: true,
    }
}


const HeaderComponent = ({ navigation }: { navigation: any }): JSX.Element => {

    const route = useRoute()
    const routeName = route.name

    const dispatch = useAppDispatch()
    const globalState = useAppSelector((state) => state)

    // const listRef = navigation.state.params?.listRef

    const { theme, settings, browseSearch, browseSort } = globalState

    const insets = useSafeAreaInsets()

    const [openSearchBar, setOpenSearchBar] = useState(false)
    const [searchText, setSearchText] = useState('')

    const displayFilter = Config[routeName].filter
    const displaySearch = Config[routeName].search || !openSearchBar
    const displayAdd = Config[routeName].add && !openSearchBar

    function toggleSearch(): void {
        setOpenSearchBar(!openSearchBar)
    }

    function searchDatabase(): void {
        // if (typeof listRef.current !== 'undefined') {
        //     listRef.current.scrollToOffset({ aniamted: true, offset: 0 })
        // }
        dispatch(
            getRecipes({ scopes: ['published'], search: browseSearch, sort: browseSort.sortState })
        )
    }

    const [openSort, toggleSort] = useToggle(false)

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
                        onPress={() => toggleSort()}
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

                {openSort ? (
                    <Sort routeName={routeName} toggle={toggleSort} />
                ) : null}
            </HeaderContainer>
        </Container>
    )
}

export default HeaderComponent

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
