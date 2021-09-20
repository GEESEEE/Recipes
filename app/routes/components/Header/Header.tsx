import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { useRoute } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import { ButtonIcon, FeatherButton, FeatherButtonProps } from '@/components/user-input/Buttons'
import SearchBarComponent from './Search'
import { browseRecipeActions } from '@/actions'
import Sort from '@/components/user-input/search/SortModal'

interface ScreenConfig {
    filter: boolean
    search: boolean
    add: boolean
}

const Config: { [key: string]: ScreenConfig } = {
    Browse: {
        filter: true,
        search: true,
        add: false,
    },
    Recipes: {
        filter: true,
        search: false,
        add: true,
    },
}

const HeaderComponent = ({
    navigation,
    listRef,
}: {
    navigation: any
    listRef?: any
}): JSX.Element => {
    const route = useRoute()
    const routeName = route.name

    const dispatch = useAppDispatch()
    const { theme, settings, browseSearch, browseSort } = useAppSelector(
        (state) => state
    )

    const insets = useSafeAreaInsets()

    const [openSort, toggleSort] = useToggle(false)
    const [openSearchBar, setOpenSearchBar] = useState(false)
    const [searchText, setSearchText] = useState('')

    const displayFilter = Config[routeName].filter
    const displaySearch = Config[routeName].search || !openSearchBar
    const displayAdd = Config[routeName].add && !openSearchBar

    function toggleSearch(): void {
        setOpenSearchBar(!openSearchBar)
    }

    function searchDatabase(): void {
        if (typeof listRef?.current !== 'undefined') {
            listRef.current.scrollToOffset({ animated: true, offset: 0 })
        }
        dispatch(
            browseRecipeActions.getRecipes({
                scopes: ['published'],
                search: browseSearch,
                sort: browseSort.sortState,
            })
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
                        toggle={() => toggleSearch()}
                        searchText={searchText}
                        setText={setSearchText}
                    />
                ) : (
                    <HeaderFlex>
                        <HeaderButton
                            iconName="menu"
                            onPress={() => navigation.toggleDrawer()}
                            color={iconColor}
                        />
                        <HeaderTitle style={{ color: iconColor }}>
                            {routeName}
                        </HeaderTitle>
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
                    <HeaderButton
                        iconName="filter"
                        onPress={() => toggleSort()}
                        size={25}
                        color={iconColor}
                    />
                ) : null}

                {/* Create Recipe Button */}
                {displayAdd ? (
                    <HeaderButton
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


const HeaderButton = ({iconName, onPress, color, size}: FeatherButtonProps): JSX.Element => (
        <HeaderButtonView>
            <FeatherButton
                iconName={iconName}
                onPress={onPress}
                color={color}
                size={size}
            />
        </HeaderButtonView>
    )


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
    align-items: center;
    flex-direction: row;
`

const HeaderTitle = styled(Text)`
    flex: 1;
    padding-left: 15px;

    justify-content: flex-end;
    align-items: flex-end;
    align-content: flex-end;

    font-size: 20px;
    font-weight: bold;
`
const HeaderButtonView = styled(View)`
    padding-left: 2px;
    padding-right: 2px;
`
