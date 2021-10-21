import React from 'react'
import { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView'
import { Dimensions } from 'react-native'
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
} from 'recyclerlistview'
import { SectionListItem } from '@/components/molecules'
import { View } from '@/components/base'
import { listItemHeightMap, ListItem } from '@/components/molecules'
import { Loading4Dots } from '@/components/atoms'
import { useAppSelector } from '@/hooks'

const { width } = Dimensions.get('window')
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
    const { textSize } = useAppSelector((state) => state.settings)

    const rowRenderer = (_: string | number, item: T): JSX.Element | null => {
        return <Element item={item} {...props} />
    }

    const layoutProvider = new LayoutProvider(
        () => ViewTypes.Item,
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

    const dataProvider = new DataProvider(
        (r1, r2) => r1.id !== r2.id
    ).cloneWithRows(data)

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
            />
        )
    }

    return <View />
}

export default ListItemRecyclerView
