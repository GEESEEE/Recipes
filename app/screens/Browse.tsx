import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'
import { retrieveRecipes } from '../actions/my-recipes'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import RecipesFlatList from '../components/data/RecipesFlatList'
import { addRecipes, getRecipes } from '../actions/browse-recipes'
import RecipesListHeader from '../components/data/RecipesListHeader'
import { retrieveUserData } from '../actions/user'


function BrowseScreen({ navigation }: { navigation: any }): JSX.Element {
    const {browseRecipes, browseSort, browseSearch} = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const listRef = React.useRef<FlatList>()

    useEffect(() => {
        // navigation.setParams({ listRef })
        dispatch(retrieveUserData())
        dispatch(retrieveRecipes())
        dispatch(getRecipes({ scopes: ['published'], sort: ['publishtime'] }))
    }, [])

    const onEndReached = (): void => {
        if (browseRecipes.nextPage !== null && !browseRecipes.loading) {
            const params = {
                ...browseRecipes.currentParams,
                page: browseRecipes.nextPage,
            }
            dispatch(addRecipes(params))
        }
    }

    const displayHeader = browseSearch.length > 0 || browseSort.sortState.length > 0

    return (
        <Container>
            <RecipesListHeader display={displayHeader} />
            <RecipesFlatList
                ref={listRef}
                recipes={browseRecipes.recipes}
                navigation={navigation}
                onEndReached={onEndReached}
            />
        </Container>
    )
}

export default BrowseScreen

const Container = styled(View)`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: ${(props) => props.theme.background};
    padding-bottom: 5px;
`
