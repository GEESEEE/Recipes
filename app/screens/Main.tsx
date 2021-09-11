import React, { useEffect } from 'react'
import { FlatList, View, Text } from 'react-native'
import styled from 'styled-components'
import { retrieveRecipes } from '../actions/my-recipes'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import RecipesFlatList from '../components/data/RecipesFlatList'
import { useDebounce } from '../hooks'
import { getRecipes } from '../actions/browse-recipes'
import SortHeader from '../components/user-input/SortHeader'

function MainScreen({ navigation }: { navigation: any }): JSX.Element {
    const browseRecipes = useAppSelector((state) => state.browseRecipes)
    const dispatch = useAppDispatch()

    const listRef = React.useRef<FlatList>()

    const search = navigation.state.params?.search
    const sortState = useAppSelector((state) => state.browseSort)
    const sort = sortState.sortState

    useEffect(() => {
        dispatch(retrieveRecipes())
        dispatch(getRecipes({ scopes: ['published'], sort: ['publishtime'] }))
    }, [])

    const onSearch = (): void => {
        if (typeof listRef.current !== 'undefined') {
            listRef.current.scrollToOffset({ animated: true, offset: 0 })
        }
        dispatch(getRecipes({ scopes: ['published'], search, sort }))
    }

    useDebounce(onSearch, 1000, [search, sort])

    return (
        <Container>
            <SortHeader route="Main" />
            <RecipesFlatList
                ref={listRef}
                recipes={browseRecipes}
                navigation={navigation}
            />
        </Container>
    )
}

export default MainScreen

const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
    padding-bottom: 5px;
`

const SampleText = styled(Text)`
    color: ${(props) => props.theme.primary}
    font-size: 15px;
`
