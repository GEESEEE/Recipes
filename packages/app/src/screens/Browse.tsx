import React from 'react'
import styled from 'styled-components'
import { View, Text } from '@/components/base'
import { useAppSelector, useHeader } from '@/hooks'

function BrowseScreen({ navigation }: { navigation: any }): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    useHeader(navigation, { drawer: true, search: true, right: [] })

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
