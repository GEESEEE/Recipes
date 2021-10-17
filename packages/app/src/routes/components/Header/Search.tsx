import React from 'react'
import styled from 'styled-components'
import { View, TextInput } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { FeatherButton } from '@/components/user-input/Buttons'
import { searchActions } from '@/redux/actions'
import { BROWSE_SEARCH_ACTIONS, MY_SEARCH_ACTIONS } from '@/redux/reducers'

const SearchBarComponent = ({
    toggle,
    searchText,
    setText,
}: {
    toggle: () => void
    searchText: string
    setText(text: string): void
}): JSX.Element => {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings
    const dispatch = useAppDispatch()

    const route = useRoute()
    const routeName = route.name

    const addSearchType =
        routeName === 'Browse'
            ? BROWSE_SEARCH_ACTIONS.ADD_SEARCH
            : MY_SEARCH_ACTIONS.ADD_SEARCH

    function handleText(search: string): void {
        setText(search)
    }

    const backgroundColor = settings.invertedColors
        ? theme.background
        : theme.backgroundVariant

    return (
        <SearchBarContainer style={{ backgroundColor }}>
            <FeatherButton
                iconName="arrow-left"
                onPress={() => toggle()}
                size={25}
            />
            <SearchBar
                placeholder="Search"
                placeholderTextColor={theme.grey}
                onChangeText={(t: string) => handleText(t)}
                value={searchText}
            />
            <FeatherButton
                iconName="x"
                onPress={() => handleText('')}
                size={25}
            />
            <FeatherButton
                iconName="plus"
                onPress={() => {
                    if (searchText.length > 0) {
                        dispatch(
                            searchActions.addSearch(addSearchType, searchText)
                        )
                    }
                    handleText('')
                }}
                size={27}
            />
        </SearchBarContainer>
    )
}

export default SearchBarComponent

const SearchBarContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => props.theme.backgroundVariant};
    border-radius: 10px;
    margin-end: 5px;
`

const SearchBar = styled(TextInput)`
    flex: 1;
    color: ${(props) => props.theme.text};
    padding-left: 8px;
    padding-right: 8px;
`
