import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { DropDownMenu } from '../components/DropdownMenu'

const TestScreen = (): JSX.Element => {
    console.log("Test Screen")

    const items=[{
        text: 'Test',
        onPress: () => console.log("Test1")
    }, {
        text: 'Test2',
        onPress: () => console.log("Test2")
    }]

    return (
        <Container>
            <SampleText >
                Test Screen
            </SampleText>
            <DropDownMenu
                items={items}
            />
        </Container>
    )
}

export default TestScreen

const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
`

const SampleText = styled(Text)`
    color: ${(props) => props.theme.primary}
    font-size: 20px;
    border-color: ${(props) => props.theme.primary}
    border-width: 1px;
    width: 100px;
    height: 100px;
`

