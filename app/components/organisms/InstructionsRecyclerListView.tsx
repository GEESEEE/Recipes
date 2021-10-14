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
import { InstructionListItem } from '@/components/molecules'
import { Instruction } from '@/data'
import { useAppSelector } from '@/hooks'
import { Typography } from '@/styles'

const ViewTypes = {
    Instruction: 0,
}

interface InstructionsRecyclerListViewProps {
    instructions: Instruction[]
}

function InstructionsRecyclerListView({
    instructions,
}: InstructionsRecyclerListViewProps): JSX.Element {
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
    ).cloneWithRows(instructions)

    const layoutProvider = new LayoutProvider(
        (_index) => ViewTypes.Instruction,
        (type, dim) => {
            switch (type) {
                case ViewTypes.Instruction: {
                    dim.width = width
                    dim.height =
                        16 + Typography.lineHeight('SubHeader', textSize)
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
            case ViewTypes.Instruction:
                return (
                    <InstructionListItem
                        instructions={instructions}
                        instruction={data}
                    />
                )

            default:
                return null
        }
    }

    return (
        <Container>
            {instructions.length > 0 ? (
                <RecyclerListView
                    style={styles.recyclerList}
                    layoutProvider={layoutProvider}
                    dataProvider={dataProvider}
                    rowRenderer={rowRenderer}
                    onScroll={(e, x, y) => handleScroll(e, x, y)}
                />
            ) : (
                <Text>Niks</Text>
            )}
        </Container>
    )
}

export default InstructionsRecyclerListView

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
