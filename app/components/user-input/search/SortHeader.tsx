import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { sorts } from '../../../actions/sort'
import { useAppSelector } from '../../../hooks'
import SortRow from './SortRow'

function SortHeader({ route }: { route: string }): JSX.Element {
    const globalState = useAppSelector((state) => state)
    const sortState =
        route === 'Main' ? globalState.browseSort : globalState.mySort
    const sort = sortState.sortState

    return (
        <Container>
            {sort.map((s) => {
                const filt = sorts.find((f) => s.includes(f.type))
                if (typeof filt === 'undefined') return null
                return (
                    <SortRow
                        key={uuid()}
                        type={filt.type}
                        name={filt.name}
                        options={filt.options}
                        routeName={route}
                        header
                    />
                )
            })}
        </Container>
    )
}

export default SortHeader

const Container = styled(View)`
    padding-bottom: 3px;
`
