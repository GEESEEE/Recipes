import React, { useState } from 'react'
import styled from 'styled-components'
import { View, TextInput } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { FeatherButton } from '../../user-input/Buttons'
import { addSearch, removeSearch } from '../../../actions/search'
import { BROWSE_SEARCH_ACTIONS } from '../../../reducers/browse'
import { MY_SEARCH_ACTIONS } from '../../../reducers/my'

const SearchBarComponent = ({
    navigation,
    toggle,
    searchText,
    setText,
}: {
    navigation: any
    toggle: () => void
    searchText: string
    setText(text: string): void
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const { routeName } = navigation.state

    const addSearchType = routeName === 'Main' ? BROWSE_SEARCH_ACTIONS.ADD_SEARCH : MY_SEARCH_ACTIONS.ADD_SEARCH

    const removeSearchType = routeName === 'Main'
        ? BROWSE_SEARCH_ACTIONS.REMOVE_SEARCH
        : MY_SEARCH_ACTIONS.REMOVE_SEARCH

    function handleText(search: string): void {
        setText(search)
    }

    return (
        <SearchBarContainer>
            <ReturnButton
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
            <SearchBarButton
                iconName="x"
                onPress={() => handleText('')}
                size={25}
            />
            <SearchBarButton
                iconName="plus"
                onPress={() => {
                    if (searchText.length > 0) {
                        dispatch(addSearch(addSearchType, searchText))
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

const ReturnButton = styled(FeatherButton)`
    align-self: flex-start;
    padding-left: 15px;
`

const SearchBar = styled(TextInput)`
    flex: 1;
    color: ${(props) => props.theme.text};
    padding-left: 8px;
    padding-right: 8px;
`

const SearchBarButton = styled(FeatherButton)`
    align-self: flex-end;
    padding-right: 15px;
`
