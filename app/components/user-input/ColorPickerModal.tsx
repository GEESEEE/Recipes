import React from 'react'
import { View, Text, Modal } from 'react-native'
import styled from 'styled-components'
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers'
import { ButtonFilled } from './Buttons'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setColor } from '../../actions/theme'

interface ColorPickerProps {
    toggle: () => void

}

function ColorPickerModal({
    toggle
}: ColorPickerProps): JSX.Element {

    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    function setPrimaryColor(color: string): void {
        console.log(color)
        // const hex = fromHsv(color)
        dispatch(setColor(color))
    }

    return (
        <Modal
            animationType='fade'
            transparent
        >
            <Container>
                <ButtonFilled text="Return" onPress={() => toggle()}/>
                <SampleText>Text</SampleText>
                <Picker
                    defaultColor={theme.primary}
                    oldColor={theme.primary}
                    onColorSelected={(c: string) => setPrimaryColor(c)}
                    hideSliders
                />
            </Container>

        </Modal>
    )
}

export default ColorPickerModal

const Container = styled(View)`
    width: 50%;
    height: 50%;
    background-color: ${props => props.theme.background};
    align-items: center;
`

const Picker = styled(ColorPicker)`
    height: 50%;
    width: 50%;
`

const SampleText = styled(Text)`
    color: ${(props) => props.theme.primary}
`
