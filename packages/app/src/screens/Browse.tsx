import React from 'react'
import styled from 'styled-components'

import { View, Text } from '@/components/base'
import { useAppSelector } from '@/hooks'

function BrowseScreen(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <Container backgroundColor={theme.background}>
            <Text>Browse screen toch</Text>
        </Container>
    )
}

export default BrowseScreen

const Container = styled(View)`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`
