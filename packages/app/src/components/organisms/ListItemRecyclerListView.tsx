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

type ListItemRecyclerViewProps = {
    data: any
}

function ListItemRecyclerView({
    data,
}: ListItemRecyclerViewProps): JSX.Element {
    const { width } = Dimensions.get('window')

    return (
        <Container>
            <Text>jaa zou een recycler lsit view moeten zijn</Text>
            {/* <RecyclerListView
                style={styles.recyclerList}
            /> */}
        </Container>
    )
}

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
