import React from 'react'
import styled from 'styled-components'
import { View, Text, Icons } from '@/components/base'
import { useHeader, useSettings } from '@/hooks'

function EditIngredientScreen({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const { theme } = useSettings()

    useHeader(navigation, {
        right: [
            {
                type: Icons.MyFeather,
                name: 'save',
                onPress: () => console.log('Saving ingredient'),
            },
        ],
    })

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
