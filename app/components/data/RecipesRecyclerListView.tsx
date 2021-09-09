import React from 'react'
import { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView'
import { Dimensions, View, StyleSheet } from 'react-native'
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
} from 'recyclerlistview'
import styled from 'styled-components'
import RecipeHeader from './RecipeHeader'
import { Recipe } from '../../data'


const ViewTypes = {
    RecipeHeader: 0,
}

interface RecipesRecyclerListViewProps {
    recipes: Recipe[]
    navigation: any
}

function RecipesRecyclerListView({
    recipes,
    navigation
}: RecipesRecyclerListViewProps): JSX.Element {
    const { width } = Dimensions.get('window')
    const { routeName } = navigation.state

    const [scrollPosition, setScrollPosition] = React.useState(0)

    function handleScroll(_event: ScrollEvent, _offsetX: number, offsetY: number): void {
        setScrollPosition(offsetY)
    }

    const dataProvider = new DataProvider(
        (r1, r2) => r1.id !== r2.id
    ).cloneWithRows(recipes)

    const layoutProvider = new LayoutProvider(
        (_index) => ViewTypes.RecipeHeader,
        async (type, dim) => {
            switch (type) {
                case ViewTypes.RecipeHeader:{
                    dim.width = width * 0.81
                    dim.height = 150
                    break}

                default:
                    dim.width = 0
                    dim.height = 0
                    break
            }
        }
    )

    layoutProvider.shouldRefreshWithAnchoring = false

    const rowRenderer = (type: any, data: any): JSX.Element | null => {
        switch (type) {
            case ViewTypes.RecipeHeader:
                return (
                    <RecipeHeaderContainer>
                        <RecipeHeader
                            recipe={data}
                            navigation={navigation}
                            editable="Edit-none"
                            onPress={() => navigation.navigate('ViewRecipe', {
                                recipe: data,
                            })}
                            dropdownDependencies={routeName === 'Recipes'? [scrollPosition] : undefined}
                        />
                        <RecipeHeaderBottomPadding />
                    </RecipeHeaderContainer>
                )

            default:
                return null
        }
    }

    return (
        <Container>
            {recipes.length > 0 ? (
                <RecyclerListView
                    style={styles.recyclerList}
                    layoutProvider={layoutProvider}
                    dataProvider={dataProvider}
                    rowRenderer={rowRenderer}
                    onScroll={(e, x, y) => handleScroll(e, x, y)}
                    forceNonDeterministicRendering
                    canChangeSize
                />
            ) : null}
        </Container>
    )

}

export default RecipesRecyclerListView

const Container = styled(View)`
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
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
    align-items: center;
    justify-content: center;
`

const RecipeHeaderBottomPadding = styled(View)`
    height: 20px;
`
