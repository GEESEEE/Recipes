import React, { useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import styled from 'styled-components'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
import { retrieveRecipes } from '../actions/recipes'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { RecipeHeader } from '../components/data'
import { Recipe } from '../data'

const ViewTypes = {
    RecipeHeader: 0
}

function MainScreen({ navigation }: { navigation: any }): JSX.Element {
    const recipes = useAppSelector((state) => state.recipes)
    console.log(recipes.length)
    const dispatch = useAppDispatch()
    const { width } = Dimensions.get("window");
    const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(recipes)

    const layoutProvider = new LayoutProvider(
        _index => ViewTypes.RecipeHeader,
        (type, dim) => {
            switch (type) {
                case ViewTypes.RecipeHeader:
                    dim.width = width * 0.8
                    dim.height = 180
                    break

                default:
                    dim.width = 0
                    dim.height = 0
                    break
            }
        }
    )

    const rowRenderer = (type: any, data: Recipe): JSX.Element | null => {
        switch (type) {
            case ViewTypes.RecipeHeader:
                return (
                    <RecipeHeader
                        recipe={data}
                        navigation={navigation}
                        editable='Edit-none'
                    />
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
            <SampleText>Main Screen</SampleText>
            {recipes.length > 0
            ?   <RecyclerListView
                    style={styles.recyclerList}
                    layoutProvider={layoutProvider}
                    dataProvider={dataProvider}
                    rowRenderer={rowRenderer}
                    forceNonDeterministicRendering
                />
            : null}
        </Container>
    )
}

export default MainScreen

const Container = styled(View)`
    flex: 1px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
`

const styles = StyleSheet.create({
    recyclerList: {
        flex: 1,
        width: '100%',
    }
})


const SampleText = styled(Text)`
    color: ${(props) => props.theme.primary}
    font-size: 20px;
    border-color: ${(props) => props.theme.primary}
    border-width: 1px;
`
