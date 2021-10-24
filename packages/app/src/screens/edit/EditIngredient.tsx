import React from 'react'
import styled from 'styled-components'
import { View, Text } from '@/components/base'
import { useAppSelector } from '@/hooks'

function EditIngredientScreen(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <Container backgroundColor={theme.background}>
            <Text>Edit 1 ingredient Screen enzo</Text>
        </Container>
    )
}

export default EditIngredientScreen

const Container = styled(View)`
    flex: 1;
`