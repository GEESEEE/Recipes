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
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import { View } from '@/components/base'
import { Loading4Dots } from '@/components/atoms'
import { useAppDispatch, useToggle } from '@/hooks'
import { GestureChangeEvent, ListItem, ListItemBaseProps } from '@/types'
import { moveElement } from '@/utils'

const { width } = Dimensions.get('window')

const ViewTypes = {
    Item: 0,
}

const dataProviderInstance = new DataProvider(
    (r1, r2) => r1 !== r2 || !isEqual(r1, r2)
)

type ListItemRecyclerViewProps<
    T extends ListItem,
    U extends Omit<ListItemBaseProps<T>, 'item' | 'onGesture'>
> = {
    data: Array<T>
    props: U
    loading?: boolean
    dragDrop?: boolean
    updateSlice?: (arr: T[]) => { payload: any; type: string }
    updateDatabase?: (
        items: Array<ListItem>
    ) => Promise<{ data: Array<T> } | { error: any }>
    Element: (
        props: U & {
            item: T
            onGesture?: (e: GestureChangeEvent) => void
            hide?: boolean
        }
    ) => JSX.Element
    itemHeight: number
    onEndReached?: () => void
}

function useCombinedRefs(...refs: any): any {
    const targetRef = React.useRef()

    React.useEffect(() => {
        refs.forEach((ref: any) => {
            if (!ref) return

            if (typeof ref === 'function') {
                ref(targetRef.current)
            } else {
                ref.current = targetRef.current
            }
        })
    }, [refs])

    return targetRef
}

const ListItemRecyclerView = React.forwardRef(
    <T extends ListItem, U>(
        {
            data,
            Element,
            props,
            loading,
            dragDrop,
            updateSlice,
            updateDatabase,
            itemHeight,
            onEndReached,
        }: ListItemRecyclerViewProps<T, U>,
        ref?: any
    ): JSX.Element => {
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
        const combinedRef = useCombinedRefs(ref, listRef)

        const renderItemsAhead = 5

        const itemLayout = {
            width,
            height: itemHeight,
        }

        const [layoutProvider] = React.useState(
            new LayoutProvider(
                () => ViewTypes.Item,
                (_, dim) => {
                    dim.width = width
                    dim.height = itemHeight
                }
            )
        )

        const [dataProvider, setDataProvider] = useState<DataProvider>(
            dataProviderInstance.cloneWithRows(data)
        )

        React.useEffect(() => {
            setDataProvider(dataProviderInstance.cloneWithRows(data))
        }, [data])

        React.useEffect(() => {
            setMaxHeight(containerHeight - itemHeight)
        }, [containerHeight, itemHeight])

        function onContainerLayout(e: LayoutChangeEvent): void {
            const layout = e.nativeEvent.layout
            setContainerHeight(layout.height)
        }

        function onScroll(e: ScrollEvent): void {
            const event = e.nativeEvent
            scrollOffset.value = event.contentOffset.y
        }

        function toIndex(posY: number): number {
            let index = Math.round(
                (posY + scrollOffset.value) / itemLayout.height
            )
            index = Math.min(dataProvider.getSize() - 1, Math.max(0, index))
            return index
        }

        const [from, setFrom] = React.useState(-1)

        function start(posY: number): void {
            const index = toIndex(posY)
            setFrom(index)
            setDragIndex(index)
            setDragging(true)
            currentIndex.value = index
            data[index] = cloneDeep(data[index])
        }

        function reset(posY: number): void {
            const to = toIndex(posY)
            setPosY(0)
            setDragging(false)
            setDragIndex(-1)
            currentIndex.value = -1
            scrolling.value = false
            if (from !== to) {
                updateData(dataProvider.getAllData(), from, to)
            } else {
                data[from] = cloneDeep(data[from])
            }
        }

        async function updateData(
            newState: Array<T>,
            from: number,
            to: number
        ): Promise<void> {
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
            if (typeof updateSlice !== 'undefined') {
                dispatch(updateSlice(updateObjects as T[]))
            }
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
                        moveElement(
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

        const rowRenderer = (
            _: string | number,
            item: T,
            index: number
        ): JSX.Element | null => {
            return (
                <Element
                    hide={index === dragIndex}
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
                                ...itemLayout,
                            }}
                        >
                            {rowRenderer(
                                ViewTypes.Item,
                                dataProvider.getDataForIndex(dragIndex),
                                -1
                            )}
                        </AnimatedView>
                    ) : null}

                    <RecyclerListView
                        ref={combinedRef}
                        style={{ width }}
                        layoutProvider={layoutProvider}
                        dataProvider={dataProvider}
                        rowRenderer={rowRenderer}
                        onScroll={onScroll}
                        onEndReached={onEndReached}
                        // renderAheadOffset={itemHeight * renderItemsAhead}
                        scrollViewProps={{
                            showsVerticalScrollIndicator: false,
                        }}
                    />
                </Container>
            )
        }

        return <View />
    }
)

export default ListItemRecyclerView

const Container = styled(View)`
    flex: 1;
`

const AnimatedView = styled(Animated.View)`
    position: absolute;
    elevation: 10;
`
