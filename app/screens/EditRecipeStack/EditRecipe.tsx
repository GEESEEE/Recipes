import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '@/hooks'
import { View, Text, TextInput } from '@/components/base'
import { TextInputWithTitle } from '@/components/atoms'
import { TextInputWithIcons } from '@/components/molecules'



function EditRecipeScreen(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <Container
            backgroundColor={theme.background}
        >
            <TextInputWithTitle
                title='Title'
                placeholder='Title'
                type='Text'
                onChangeText={(t: string) => console.log(t)}
                multiline
            />
        </Container>
    )
}

export default EditRecipeScreen

const Container = styled(View)`
    flex: 1;
    align-items: center;
`
