import React from 'react'
import styled from 'styled-components'
import { View, Text } from '@/components/base'
import { useAppSelector } from '@/hooks'

function EditInstructionsScreen(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <Container
            backgroundColor={theme.background}
        >
            <Text>
                Edit Instructions enzo
            </Text>
        </Container>
    )
}

export default EditInstructionsScreen

const Container = styled(View)`
    flex: 1;
`
