import React from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { useLayout } from '../hooks'
import { ButtonFilled } from '../components/user-input/buttons'

const TestScreen = (): JSX.Element => {
    const [open, setOpen] = React.useState(false)
    const toggle = (): void => setOpen(!open)

    const [layoutRef, onLayout] = useLayout()

    return (
        <Container>
            <SampleText onLayout={onLayout}>
                Test Screen
            </SampleText>
            <ButtonFilled text="Button" onPress={toggle}/>
            {open
            ? <CreateModal ref={layoutRef} onPress={toggle}/>
            : null}
        </Container>
    )
}

export default TestScreen

const Container = styled(View)`
    flex: 1px;
    justify-content: center;
    align-items: flex-start;
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

const CreateModal = React.forwardRef(({onPress}: {onPress: () => void}, ref: any): JSX.Element => {
    const coords = ref.current

    const Mod = styled(Modal)`
        background-color: ${(props) => props.theme.background};
        border-color: ${(props) => props.theme.primary};
        border-width: 1px;
    `
    const SampleT = styled(Text)`
        color: ${(props) => props.theme.primary}
        font-size: 20px;
        position: absolute;
        width: ${coords.width}px;
        height: ${coords.height}px;
        margin-left: ${coords.pageX}px;
        margin-top: ${coords.pageY}px;
        border-color: ${(props) => props.theme.primary};
        border-width: 1px;
    `

    const Return = styled(TouchableOpacity)`
        flex: 1;
        border-color: ${(props) => props.theme.primary};
        border-width: 1px;
    `

    return (
            <Mod transparent>
                <Return onPress={onPress}/>
                <SampleT>
                    Modal
                </SampleT>
            </Mod>

    )
})

