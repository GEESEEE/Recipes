import React from 'react'
import styled from 'styled-components'
import { useAppSelector, useToggle } from '@/hooks'
import { View, Text, TextInput } from '@/components/base'
import { TextInputWithTitle, Button } from '@/components/atoms'
import { TextInputWithIcons } from '@/components/molecules'



function EditRecipeScreen(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <Container
            backgroundColor={theme.background}
        >
            <TextInputWithTitle
                title='Title'
                type='SubHeader'
                onChangeText={(t: string) => console.log('')}
                multiline
            />

            <TextInputWithTitle
                title='Description'
                onChangeText={(t: string) => console.log('')}
            />


        </Container>
    )
}

export default EditRecipeScreen

const Container = styled(View)`
    flex: 1;
    align-items: center;
`
