import React, { useEffect } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

import { retrieveRecipes } from '../actions/my-recipes'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import RecipesRecyclerListView from '../components/data/RecipesRecyclerListView'

function MainScreen({ navigation }: { navigation: any }): JSX.Element {
    const browseRecipes = useAppSelector((state) => state.browseRecipes)
    console.log(browseRecipes.length)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(retrieveRecipes())
    }, [])

    return (
        <Container>
            <RecipesRecyclerListView
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
