import React from 'react'
import styled from 'styled-components'
import { View } from '@/components/base'
import { SortRow } from '@/components/molecules'
import { useSettings, useSort } from '@/hooks'

function SortHeader(): JSX.Element {
    const { theme } = useSettings()
    const sort = useSort()

    return (
        <Container>
            {sort.order.map((sortOption, index) => (
                <SortRow key={index} position={index} option={sortOption} />
            ))}
        </Container>
    )
}

export default SortHeader

const Container = styled(View)`
    width: 100%;
    align-items: center;
`
