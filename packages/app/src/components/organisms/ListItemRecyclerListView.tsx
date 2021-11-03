import React, { useRef, useState } from 'react'
import { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView'
import { Dimensions, LayoutChangeEvent } from 'react-native'
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
    BaseLayoutProvider,
    Dimension,
} from 'recyclerlistview'
import styled from 'styled-components'
import { useHeaderHeight } from '@react-navigation/elements'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { State } from 'react-native-gesture-handler'
import { View } from '@/components/base'
import { Loading4Dots } from '@/components/atoms'
import { useAppDispatch, useSettings, useToggle } from '@/hooks'
import { GestureChangeEvent, ListItem, ListItemBaseProps } from '@/types'
import { utils, listItemUtils } from '@/utils'

const { width } = Dimensions.get('window')

const ViewTypes = {
    Item: 0,
}

const defaultItemLayout = {
    width,
    height: 70,
}

const defaultLayoutProvider = new LayoutProvider(
    () => ViewTypes.Item,
    (_, dim) => {
        dim.width = defaultItemLayout.width
        dim.height = defaultItemLayout.height
    }
)

const layoutProviders: {
    [key: string]: BaseLayoutProvider
} = {}

const itemLayouts: {
    [key: string]: Dimension
} = {}

const dataProviderInstance = new DataProvider((r1, r2) => r1.id !== r2.id)

type ListItemRecyclerViewProps<
    T extends ListItem,
    U extends Omit<ListItemBaseProps<T>, 'item' | 'onGesture'>
> = {
    data: Array<T>
    props: U
    loading?: boolean
    dragDrop?: boolean
    updateSlice: (arr: T[]) => { payload: any; type: string }
    updateDatabase?: (
        items: Array<ListItem>
    ) => Promise<{ data: Array<T> } | { error: any }>
    Element: (
        props: U & { item: T; onGesture?: (e: GestureChangeEvent) => void }
    ) => JSX.Element
}

function ListItemRecyclerView<T extends ListItem, U>({
    data,
    Element,
    props,
    loading,
    dragDrop,
    updateSlice,
    updateDatabase,
}: ListItemRecyclerViewProps<T, U>): JSX.Element {
    const { textSize } = useSettings()
    const dispatch = useAppDispatch()

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

    const [dataProvider, setDataProvider] = useState<DataProvider>(
        dataProviderInstance.cloneWithRows(data)
    )

    React.useEffect(() => {
        setDataProvider(dataProviderInstance.cloneWithRows(data))
    }, [data])

    const itemLay =
        typeof itemLayouts[Element.name] === 'undefined'
            ? defaultItemLayout
            : itemLayouts[Element.name]

    React.useEffect(() => {
        const layout = {
            width,
            height: listItemUtils.heightMap(Element, textSize),
        }
        itemLayouts[Element.name] = layout
        layoutProviders[Element.name] = new LayoutProvider(
            () => ViewTypes.Item,
            (_, dim) => {
                dim.width = layout.width
                dim.height = layout.height
            }
        )
        setMaxHeight(containerHeight - layout.height)
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
        let index = Math.round((posY + scrollOffset.value) / itemLay.height)
        index = Math.min(dataProvider.getSize() - 1, Math.max(0, index))
        return index
    }

    const [from, setFrom] = React.useState(-1)

    function start(posY: number): void {
        const index = toIndex(posY)
        setFrom(index)
        setDragIndex(index)
        currentIndex.value = index
        setDragging(true)
        console.log('Starting', posY, index)
    }

    function reset(posY: number): void {
        const to = toIndex(posY)
        setPosY(0)
        setDragging(false)
        setDragIndex(-1)
        currentIndex.value = -1
        scrolling.value = false
        console.log('Resetting', posY, from, to)
        updateData(dataProvider.getAllData(), from, to)
    }

    async function updateData(
        newState: Array<T>,
        from: number,
        to: number
    ): Promise<void> {
        console.log('Updating list item data', from, to)
        if (from === to) {
            return
        }

        const ids = newState.map((item) => item.id)
        const positions = newState
            .map((item) => item.position)
            .sort((a, b) => a - b)

        const updateObjects: Array<ListItem> = []
        for (let i = 0; i < newState.length; i++) {
            updateObjects.push({
                id: ids[i],
                position: positions[i],
            })
        }

        dispatch(updateSlice(updateObjects as T[]))
        if (typeof updateDatabase !== 'undefined') {
            updateDatabase(updateObjects)
        }
    }

    function move(posY: number): void {
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
                    utils.moveElement(
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
        let pos = event.absoluteY - topOffset - itemLay.height / 2
        pos = Math.max(0, Math.min(maxHeight, pos))

        setPosY(pos)
        if (event.state === State.BEGAN) {
            start(pos)
        } else if (event.state === State.ACTIVE) {
            move(pos)
        } else {
            reset(pos)
        }
    }

    const rowRenderer = (_: string | number, item: T): JSX.Element | null => {
        return (
            <Element
                onGesture={dragDrop ? onGesture : undefined}
                item={item}
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
                            ...itemLay,
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
                    layoutProvider={
                        typeof layoutProviders[Element.name] === 'undefined'
                            ? defaultLayoutProvider
                            : layoutProviders[Element.name]
                    }
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
