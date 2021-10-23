import React, { useRef, useState } from 'react'
import { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView'
import { Dimensions, LayoutChangeEvent } from 'react-native'
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
} from 'recyclerlistview'
import styled from 'styled-components'
import { useHeaderHeight } from '@react-navigation/elements'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { State } from 'react-native-gesture-handler'
import { SectionListItem } from '@/components/molecules'
import { View } from '@/components/base'
import { listItemHeightMap, ListItem } from '@/components/molecules'
import { Loading4Dots } from '@/components/atoms'
import { useAppSelector, useToggle, useUpdateEffect } from '@/hooks'
import { GestureChangeEvent } from '@/types'

const { width } = Dimensions.get('window')

const ViewTypes = {
    Item: 0,
}

type ListItemRecyclerViewProps<T extends ListItem, U> = {
    data: Array<T>
    Element: (props: U & { item: T }) => JSX.Element
    props: U
    loading?: boolean
    dragDrop?: boolean
}

const itemLayout = {
    width,
    height: 70,
}

let layoutProvider = new LayoutProvider(
    () => ViewTypes.Item,
    (_, dim) => {
        dim.width = itemLayout.width
        dim.height = itemLayout.height
    }
)

function moveData(arr: Array<any>, from: number, to: number): Array<any> {
    const element = arr[from]
    arr.splice(from, 1)
    arr.splice(to, 0, element)
    return arr
}

function ListItemRecyclerView<T extends ListItem, U>({
    data,
    Element,
    props,
    loading,
    dragDrop,
}: ListItemRecyclerViewProps<T, U>): JSX.Element {
    const { textSize } = useAppSelector((state) => state.settings)

    const scrollOffset = useSharedValue(0)
    const currentIndex = useSharedValue(-1)
    const scrolling = useSharedValue(false)

    const [dragIndex, setDragIndex] = useState(-1)
    const topOffset = useHeaderHeight()
    const [containerHeight, setContainerHeight] = useState(0)
    const [maxHeight, setMaxHeight] = useState(0)

    const [dragging, setDragging] = useToggle(false)
    const [posY, setPosY] = useState(0)

    const listRef = useRef<RecyclerListView<any, any>>(null)

    const dataProviderInstance = new DataProvider((r1, r2) => r1.id !== r2.id)

    const [dataProvider, setDataProvider] = useState(
        dataProviderInstance.cloneWithRows(data)
    )

    React.useEffect(() => {
        setDataProvider(dataProviderInstance.cloneWithRows(data))
    }, [data])

    React.useEffect(() => {
        console.log('Updating value')
        itemLayout.height = listItemHeightMap(Element, textSize)
        layoutProvider = new LayoutProvider(
            () => 0,
            (_, dim) => {
                dim.width = itemLayout.width
                dim.height = itemLayout.height
            }
        )
        setMaxHeight(containerHeight - itemLayout.height)
    }, [Element, textSize, containerHeight])

    function onContainerLayout(e: LayoutChangeEvent): void {
        const layout = e.nativeEvent.layout
        setContainerHeight(layout.height)
    }

    function onScroll(e: ScrollEvent): void {
        const event = e.nativeEvent
        scrollOffset.value = event.contentOffset.y
    }

    function toIndex(posY: number): number {
        let index = Math.round((posY + scrollOffset.value) / itemLayout.height)
        index = Math.min(dataProvider.getSize() - 1, Math.max(0, index))
        return index
    }

    function start(posY: number): void {
        console.log('start', posY)
        const index = toIndex(posY)
        setDragIndex(index)
        currentIndex.value = index
        setDragging(true)
    }

    function reset(): void {
        console.log('reset')
        setPosY(0)
        setDragging(false)
        setDragIndex(-1)
        currentIndex.value = -1
        scrolling.value = false
    }

    function move(posY: number): void {
        console.log('moving', posY)
        if (posY < 100) {
            scrolling.value = true
            moveList(-25)
        } else if (posY > maxHeight - 100) {
            scrolling.value = true
            moveList(25)
        } else {
            scrolling.value = false
        }
        updateOrder(posY)
    }

    function moveList(speed: number): void {
        if (!scrolling.value) {
            return
        }
        listRef.current?.scrollToOffset(0, scrollOffset.value + speed, true)
        requestAnimationFrame(() => {
            moveList(speed)
        })
    }

    function updateOrder(posY: number): void {
        const newIndex = toIndex(posY)
        if (currentIndex.value !== newIndex) {
            setDataProvider(
                dataProviderInstance.cloneWithRows(
                    moveData(
                        dataProvider.getAllData(),
                        currentIndex.value,
                        newIndex
                    )
                )
            )
            setDragIndex(newIndex)
            currentIndex.value = newIndex
        }
    }

    function onGesture(e: GestureChangeEvent): void {
        const event = e.nativeEvent
        let pos = event.absoluteY - topOffset - itemLayout.height / 2
        console.log('Ongesture', pos, event.absoluteY, maxHeight)
        pos = Math.max(0, Math.min(maxHeight, pos))
        console.log('actual pos', pos)
        setPosY(pos)
        if (event.state === State.BEGAN) {
            start(pos)
        } else if (event.state === State.ACTIVE) {
            move(pos)
        } else {
            reset()
        }
    }

    const rowRenderer = (_: string | number, item: T): JSX.Element | null => {
        return (
            <Element
                item={item}
                onGesture={dragDrop ? onGesture : undefined}
                {...props}
            />
        )
    }

    if (loading) {
        return <Loading4Dots width={50} />
    }

    if (data.length > 0) {
        return (
            <Container onLayout={onContainerLayout}>
                {dragging ? (
                    <AnimatedView
                        style={{
                            top: posY,
                            ...itemLayout,
                        }}
                    >
                        {rowRenderer(
                            ViewTypes.Item,
                            dataProvider.getDataForIndex(dragIndex)
                        )}
                    </AnimatedView>
                ) : null}

                <RecyclerListView
                    ref={listRef}
                    style={{ width }}
                    layoutProvider={layoutProvider}
                    dataProvider={dataProvider}
                    rowRenderer={rowRenderer}
                    onScroll={onScroll}
                />
            </Container>
        )
    }

    return <View />
}

export default ListItemRecyclerView

const Container = styled(View)`
    flex: 1;
`

const AnimatedView = styled(Animated.View)`
    position: absolute;
    elevation: 10;
`
