import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '@/hooks'
import { View, Text, TextInput } from '@/components/base'
import { TextInputWithTitle, Button } from '@/components/atoms'



function EditRecipeScreen(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    const width ='l'
    const paddingHorizontal = 'm'
    const marginVertical = 's'

    return (
        <Container
            backgroundColor={theme.background}
            paddingVertical='s'
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
                multiline
            />

            <PrepareTimeContainer
                width={width}
                paddingHorizontal={paddingHorizontal}
                marginVertical={marginVertical}
            >
                <PrepareTimeText>
                    Prepare time
                </PrepareTimeText>
                <TextInputWithTitle
                    marginHorizontal='s'
                    title='Hours'
                    onChangeText={(t: string) => console.log('')}
                    width='s'
                    keyboardType='numeric'
                    maxLength={2}
                />
                 <TextInputWithTitle
                    title='Minutes'
                    onChangeText={(t: string) => console.log('')}
                    width='s'
                    keyboardType='numeric'
                    maxLength={2}
                />
            </PrepareTimeContainer>

            <PrepareTimeContainer
                width={width}
                paddingHorizontal={paddingHorizontal}
                marginVertical={marginVertical}
            >
                <PrepareTimeText>
                    People count
                </PrepareTimeText>
                <TextInputWithTitle
                    placeholder='People count'
                    width='m'
                    marginHorizontal='s'
                    keyboardType='numeric'
                />
            </PrepareTimeContainer>

            <Button
                type='Solid'
                text='SAVE'
                onPress={() => console.log('Should save now or soething')}
            />

        </Container>
    )
}

export default EditRecipeScreen

const Container = styled(View)`
    flex: 1;
    align-items: center;
`

const PrepareTimeContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`

const PrepareTimeText = styled(Text)`
    flex: 1;
`

const PeopleCountContainer = styled(View)`

`
