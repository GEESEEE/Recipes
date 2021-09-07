import React, { useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import styled from 'styled-components'
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
} from 'recyclerlistview'

import { retrieveRecipes } from '../actions/my-recipes'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { RecipeHeader } from '../components/data'
import { Recipe } from '../data'
import { applySearch } from '../config/utils'

const ViewTypes = {
    RecipeHeader: 0,
}


function MainScreen({ navigation }: { navigation: any }): JSX.Element {
    const recipes = useAppSelector((state) => state.browseRecipes)
    console.log(recipes.length)
    const dispatch = useAppDispatch()
    const { width } = Dimensions.get('window')

    const search = navigation.state.params?.search
    // const filteredRecipes = applySearch(recipes, search)

    const dataProvider = new DataProvider(
        (r1, r2) => r1.id !== r2.id
    ).cloneWithRows(recipes)

    const layoutProvider = new LayoutProvider(
        (_index) => ViewTypes.RecipeHeader,
        (type, dim) => {
            switch (type) {
                case ViewTypes.RecipeHeader:
                    dim.width = width
                    dim.height = 150
                    break

                default:
                    dim.width = 0
                    dim.height = 0
                    break
            }
        }
    )

    const rowRenderer = (type: any, data: any): JSX.Element | null => {
        switch (type) {
            case ViewTypes.RecipeHeader:
                return (
                    <RecipeHeaderContainer>
                        <RecipeHeader
                            recipe={data}
                            navigation={navigation}
                            editable="Edit-none"
                        />
                        <RecipeHeaderBottomPadding />
                    </RecipeHeaderContainer>
                )

            default:
                return null
        }
    }

    useEffect(() => {
        dispatch(retrieveRecipes())
    }, [])

    return (
        <Container>
            {filteredRecipes.length > 0 ? (
                <RecyclerListView
                    style={styles.recyclerList}
                    layoutProvider={layoutProvider}
                    dataProvider={dataProvider}
                    rowRenderer={rowRenderer}
                    forceNonDeterministicRendering
                />
            ) : null}
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

const styles = StyleSheet.create({
    recyclerList: {
        width: '90%',
        alignSelf: 'center',
        paddingTop: 5,
    },
})

const RecipeHeaderContainer = styled(View)`
    flex: 1;
`

const RecipeHeaderBottomPadding = styled(View)`
    height: 20px;
`

const SampleText = styled(Text)`
    color: ${(props) => props.theme.primary};
    font-size: 16px;
`
