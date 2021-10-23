import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
} from 'react-native-reanimated'
import { Dimensions, LayoutChangeEvent } from 'react-native'
import {
    RecyclerListView,
    LayoutProvider,
    DataProvider,
} from 'recyclerlistview'
import { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView'
import { View, Text, Icon, Icons } from '@/components/base'
import { useAppSelector, useToggle, useUpdateEffect } from '@/hooks'
import { GestureChangeEvent, GestureStateEvent } from '@/types'

const { width, height } = Dimensions.get('window')

const ViewTypes = {
    Item: 0,
}

const itemLayout = {
    width,
    height: 70,
}

const layoutProvider = new LayoutProvider(
    () => ViewTypes.Item,
    (type, dim) => {
        switch (type) {
            case ViewTypes.Item: {
                dim.height = itemLayout.height
                dim.width = itemLayout.width
                break
            }

            default:
                dim.height = 0
                dim.width = 0
                break
        }
    }
)

function generateData(): Array<{ id: number; color: string }> {
    const res = []
    const ids = [...Array(100).keys()]
    for (const id of ids) {
        res.push({ id, color: getRandomColor() })
    }
    return res
}

const data = generateData()

function moveData(arr: Array<any>, from: number, to: number): Array<any> {
    const element = arr[from]
    arr.splice(from, 1)
    arr.splice(to, 0, element)
    return arr
}

function DragDropTest(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    const scrollOffset = useSharedValue(0)
    const currentIndex = useSharedValue(-1)
    const scrolling = useSharedValue(false)

    const [dragIndex, setDragIndex] = useState(-1)
    const [maxHeight, setMaxHeight] = useState(0)
    const [topOffset, setTopOffset] = useState(0)

    const [dragging, setDragging] = useToggle(false)
    const [posY, setPosY] = useState(0)

    const listRef = useRef<RecyclerListView<any, any>>(null)

    const dataProviderInstance = new DataProvider((r1, r2) => r1.id !== r2.id)

    const [dataProvider, setDataProvider] = useState(
        dataProviderInstance.cloneWithRows(data)
    )

    function onContainerLayout(e: LayoutChangeEvent): void {
        const layout = e.nativeEvent.layout
        setTopOffset(layout.y)
        setMaxHeight(layout.height - itemLayout.height)
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
        const index = toIndex(posY)
        setDragIndex(index)
        currentIndex.value = index
        setDragging(true)
    }

    function reset(): void {
        setPosY(0)
        setDragging(false)
        setDragIndex(-1)
        currentIndex.value = -1
        scrolling.value = false
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
        pos = Math.max(0, Math.min(maxHeight, pos))

        setPosY(pos)
        if (event.state === State.BEGAN) {
            start(pos)
        } else if (event.state === State.ACTIVE) {
            move(pos)
        } else {
            reset()
        }
    }

    const rowRenderer = (
        _type: string | number,
        item: { id: number; color: string }
    ) => {
        return (
            <StyledView backgroundColor={item.color}>
                <PanGestureHandler
                    maxPointers={1}
                    onGestureEvent={onGesture}
                    onHandlerStateChange={onGesture}
                >
                    <Animated.View>
                        <Icon
                            type={Icons.MyFeather}
                            name="menu"
                            color={theme.text}
                            size="l"
                        />
                    </Animated.View>
                </PanGestureHandler>
                <Text type="Header">{item.id.toString()}</Text>
            </StyledView>
        )
    }

    return (
        <Container onLayout={onContainerLayout}>
            {scrolling.value ? (
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

export default DragDropTest

const Container = styled(View)`
    flex: 1;
`

const AnimatedView = styled(Animated.View)`
    position: absolute;
    elevation: 10;
`

const StyledView = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
`

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
