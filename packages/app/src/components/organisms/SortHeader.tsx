import React from 'react'
import styled from 'styled-components'
import { View } from '@/components/base'
import { SortRow } from '@/components/molecules'
import { useSort } from '@/hooks'

function SortHeader(): JSX.Element {
    const sort = useSort()

    return (
        <Container width="l">
            {sort.order.map((sortOption, index) => (
                <SortRow
                    key={index}
                    position={index}
                    option={sortOption}
                    header
                />
            ))}
        </Container>
    )
}

export default SortHeader

const Container = styled(View)`
    align-items: center;
`
