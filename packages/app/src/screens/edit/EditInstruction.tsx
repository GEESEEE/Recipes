import React from 'react'
import styled from 'styled-components'
import { View, Text, Icons } from '@/components/base'
import { useAppSelector, useHeader } from '@/hooks'

function EditInstructionScreen({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    useHeader(navigation, {
        right: [
            {
                type: Icons.MyFeather,
                name: 'save',
                onPress: () => console.log('Saving instruction'),
            },
        ],
    })

    return (
        <Container backgroundColor={theme.background}>
            <Text>Edit 1 instruction Screen enzo</Text>
        </Container>
    )
}

export default EditInstructionScreen

const Container = styled(View)`
    flex: 1;
`
