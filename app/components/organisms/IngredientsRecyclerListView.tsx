import React from 'react'
import { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView'
import { Dimensions, StyleSheet } from 'react-native'
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
} from 'recyclerlistview'
import styled from 'styled-components'
import { View, Text } from '@/components/base'
import { InstructionListItem, IngredientListItem } from '@/components/molecules'
import { RecipeIngredient } from '@/data'
import { useAppSelector } from '@/hooks'
import { Typography } from '@/styles'

const ViewTypes = {
    Ingredient: 0,
}

interface IngredientsRecyclerListViewProps {
    ingredients: RecipeIngredient[]
}

function IngredientsRecyclerListView({
    ingredients,
}: IngredientsRecyclerListViewProps): JSX.Element {
    const { width } = Dimensions.get('window')
    const { textSize } = useAppSelector((state) => state.settings)

    const [scrollPosition, setScrollPosition] = React.useState(0)

    function handleScroll(
        _event: ScrollEvent,
        _offsetX: number,
        offsetY: number
    ): void {
        setScrollPosition(offsetY)
    }

    const dataProvider = new DataProvider(
        (r1, r2) => r1.id !== r2.id
    ).cloneWithRows(ingredients)

    const layoutProvider = new LayoutProvider(
        (_index) => ViewTypes.Ingredient,
        (type, dim) => {
            switch (type) {
                case ViewTypes.Ingredient: {
                    dim.width = width
                    dim.height =
                        16 + 2 * Typography.lineHeight('Text', textSize)
                    break
                }

                default:
                    dim.width = 0
                    dim.height = 0
                    break
            }
        }
    )

    const rowRenderer = (type: any, data: any): JSX.Element | null => {
        switch (type) {
            case ViewTypes.Ingredient:
                return (
                    <IngredientListItem
                        ingredients={ingredients}
                        ingredient={data}
                    />
                )

            default:
                return null
        }
    }

    return (
        <Container>
            {ingredients.length > 0 ? (
                <RecyclerListView
                    style={styles.recyclerList}
                    layoutProvider={layoutProvider}
                    dataProvider={dataProvider}
                    rowRenderer={rowRenderer}
                    onScroll={(e, x, y) => handleScroll(e, x, y)}
                />
            ) : (
                <Text>Tap the + Icon to add an ingredient!</Text>
            )}
        </Container>
    )
}

export default IngredientsRecyclerListView

const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
`

const styles = StyleSheet.create({
    recyclerList: {
        width: '100%',
    },
})
