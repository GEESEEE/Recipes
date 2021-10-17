import { useRoute } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { sortActions } from '@/redux/actions'
import { useAppSelector } from '@/hooks'
import SortRow from './SortRow'

function SortHeader(): JSX.Element {
    const globalState = useAppSelector((state) => state)
    const { name } = useRoute()

    const sortState: any = []
        // name === 'Browse' ? globalState.browseSort : globalState.mySort
    // const sort = sortState.sortState

    return (
        <Container>
            {/* {sort.map((s) => {
                const filt = sortActions.sorts.find((f) => s.includes(f.type))
                if (typeof filt === 'undefined') return null
                return (
                    <SortRow
                        key={uuid()}
                        type={filt.type}
                        name={filt.name}
                        options={filt.options}
                        routeName={name}
                        header
                    />
                )
            })} */}
        </Container>
    )
}

export default SortHeader

const Container = styled(View)`
    padding-bottom: 3px;
`
