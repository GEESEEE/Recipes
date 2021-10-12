import React from 'react'
import styled from 'styled-components'
import { View, Text } from '@/components/base'
import { useAppSelector } from '@/hooks'


function EditRecipeScreen(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <Container
            backgroundColor={theme.background}
        >
            <Text>
                Edit Recipe Screen enzo
            </Text>
        </Container>
    )
}

export default EditRecipeScreen

const Container = styled(View)`
    flex: 1;
`
