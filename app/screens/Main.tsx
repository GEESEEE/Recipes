import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'
import { retrieveRecipes } from '../actions/my-recipes'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import RecipesFlatList from '../components/data/RecipesFlatList'
import { useDebounce } from '../hooks'
import { getRecipes } from '../actions/browse-recipes'

function MainScreen({ navigation }: { navigation: any }): JSX.Element {
    const browseRecipes = useAppSelector((state) => state.browseRecipes)
    const dispatch = useAppDispatch()

    const listRef = React.useRef<FlatList>()
    const search = navigation.state.params?.search

    useEffect(() => {
        dispatch(retrieveRecipes())
        dispatch(getRecipes(['published']))
    }, [])

    const onSearch = (): void => {
        if (typeof listRef.current !== 'undefined') {
            listRef.current.scrollToOffset({ animated: true, offset: 0 })
        }
        dispatch(getRecipes(['published'], search))
    }

    useDebounce(onSearch, 1000, [search])

    return (
        <Container>
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
