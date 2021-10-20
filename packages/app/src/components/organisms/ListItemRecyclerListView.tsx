import React from 'react'
import { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView'
import { Dimensions } from 'react-native'
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
} from 'recyclerlistview'
import styled from 'styled-components'
import { View, Text } from '@/components/base'
import {
    listItemHeightMap,
    ListItemBaseProps,
    ListItem,
} from '@/components/molecules'
import { useAppSelector } from '@/hooks'
import { Typography } from '@/styles'

const ViewTypes = {
    Item: 0,
}

type ListItemRecyclerViewProps<T extends ListItem, U> = {
    data: Array<T>
    Element: (props: U & { item: T }) => JSX.Element
    props: U
}

function ListItemRecyclerView<T extends ListItem, U>({
    data,
    Element,
    props,
}: ListItemRecyclerViewProps<T, U>): JSX.Element {
    const { width } = Dimensions.get('window')
    const { textSize } = useAppSelector((state) => state.settings)

    const rowRenderer = (
        type: string | number,
        item: T
    ): JSX.Element | null => {
        switch (type) {
            case ViewTypes.Item:
                return <Element item={item} {...props} />

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

    return (
        <RecyclerListView
            style={{ width }}
            layoutProvider={layoutProvider}
            dataProvider={dataProvider}
            rowRenderer={rowRenderer}
        />
    )
}

export default ListItemRecyclerView
