import React from 'react'
import { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView'
import { Dimensions } from 'react-native'
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
} from 'recyclerlistview'

import { View } from '@/components/base'
import { listItemHeightMap, ListItem } from '@/components/molecules'
import { useAppSelector } from '@/hooks'
import { Loading4Dots } from '@/components/atoms'

const ViewTypes = {
    Item: 0,
}

type ListItemRecyclerViewProps<T extends ListItem, U> = {
    data: Array<T>
    Element: (props: U & { item: T }) => JSX.Element
    props: U
    loading?: boolean
}

function ListItemRecyclerView<T extends ListItem, U>({
    data,
    Element,
    props,
    loading,
}: ListItemRecyclerViewProps<T, U>): JSX.Element {
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

    const rowRenderer = (
        type: string | number,
        item: T
    ): JSX.Element | null => {
        switch (type) {
            case ViewTypes.Item:
                return (
                    <Element
                        item={item}
                        {...props}
                        dropdownDependencies={[scrollPosition]}
                    />
                )

            default:
                return null
        }
    }

    const dataProvider = new DataProvider(
        (r1, r2) => r1.id !== r2.id
    ).cloneWithRows(data)

    const layoutProvider = new LayoutProvider(
        (_index) => ViewTypes.Item,
        (type, dim) => {
            switch (type) {
                case ViewTypes.Item: {
                    dim.width = width
                    dim.height = listItemHeightMap(Element, textSize)
                    break
                }

                default:
                    dim.width = 0
                    dim.height = 0
                    break
            }
        }
    )

    if (loading) {
        return <Loading4Dots width={50} />
    }

    if (data.length > 0) {
        return (
            <RecyclerListView
                style={{ width }}
                layoutProvider={layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={rowRenderer}
                handleScroll={handleScroll}
            />
        )
    }

    return <View />
}

export default ListItemRecyclerView
