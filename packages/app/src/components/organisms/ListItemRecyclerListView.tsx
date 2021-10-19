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
import { useAppSelector } from '@/hooks'
import { Typography } from '@/styles'

const ViewTypes = {
    Item: 0,
}

type ListItemRecyclerViewProps<T, U> = {
    data: Array<T>
    Element: (props: U) => JSX.Element
    props: any
    height: number
}

function ListItemRecyclerView<T extends { id: number }, U extends { item: T }>({
    data,
    Element,
    props,
    height,
}: ListItemRecyclerViewProps<T, U>): JSX.Element {
    const { width } = Dimensions.get('window')

    const rowRenderer = (
        type: string | number,
        item: T
    ): JSX.Element | null => {
        switch (type) {
            case ViewTypes.Item:
                return <Element {...props} item={item} />

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
                    dim.height = height
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

const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
`
