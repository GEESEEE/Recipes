import React, { useEffect } from 'react'
import { FlatList, View, Text } from 'react-native'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { retrieveRecipes } from '../actions/my-recipes'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import RecipesFlatList from '../components/data/RecipesFlatList'
import { useDebounce } from '../hooks'
import { getRecipes } from '../actions/browse-recipes'
import { sorts } from './Sort'
import SortRow from '../components/user-input/SortRow'

function MainScreen({ navigation }: { navigation: any }): JSX.Element {
    const browseRecipes = useAppSelector((state) => state.browseRecipes)
    const dispatch = useAppDispatch()

    const listRef = React.useRef<FlatList>()

    const search = navigation.state.params?.search
    const sortState = useAppSelector((state) => state.browseSort)
    const sort = sortState.sortState

    useEffect(() => {
        dispatch(retrieveRecipes())
        dispatch(getRecipes({scopes: ['published'], sort: ['publishtime']}))
    }, [])

    const onSearch = (): void => {
        if (typeof listRef.current !== 'undefined') {
            listRef.current.scrollToOffset({ animated: true, offset: 0 })
        }
        dispatch(getRecipes({scopes: ['published'], search, sort}))
    }

    useDebounce(onSearch, 1000, [search, sort])

    return (
        <Container>
            {sort.map(s => {
                const filt = sorts.find(f => s.includes(f.type))
                if (typeof filt === 'undefined') return null
                return (<SortRow
                    key={uuid()}
                    type={filt.type}
                    name={filt.name}
                    options={filt.options}
                    sortState={sortState}
                />)
            })}
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
