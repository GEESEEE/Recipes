import React, { useState } from 'react'
import { View, Modal } from 'react-native'
import styled from 'styled-components'
import { fromHsv, TriangleColorPicker } from 'react-native-color-picker'
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers'
import { ButtonFilled, ReturnButton } from './Buttons'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setColor } from '../../actions/theme'
import colors from '../../config/colors'

interface ColorPickerProps {
    toggle: () => void

}

function ColorPickerModal({
    toggle
}: ColorPickerProps): JSX.Element {

    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    const [localColor, setLocalColor] = useState<string>(colors.primary)

    function setPrimaryColor(color: string): void {
        dispatch(setColor(color))
    }

    return (
        <Modal
            animationType='fade'
            transparent
        >
            <Container>
                <ReturnButton
                    onPress={() => toggle()}
                    color={localColor}
                />

                <Picker
                    style={{ borderColor: localColor}}
                    defaultColor={theme.primary}
                    oldColor={theme.primary}
                    onColorChange={(color: HsvColor) => setLocalColor(fromHsv(color))}
                />

                <ConfirmContainer>
                    <ButtonFilled
                        text="Confirm"
                        onPress={() => setPrimaryColor(localColor)}
                        color={localColor}
                    />
                </ConfirmContainer>

                <FillRest />
            </Container>

        </Modal>
    )
}

export default ColorPickerModal

const Container = styled(View)`
    flex 1;
    background-color: ${props => props.theme.background};
    align-items: center;
`

const Picker = styled(TriangleColorPicker)`
    height: 70%;
    width: 70%;
    padding: 30px;
    border-width: 3px;
    border-radius: 20px;
`

const ConfirmContainer = styled(View)`
    width: 70%;
    align-items: center;
    padding-top: 30px;
`

const FillRest = styled(View)`
    height: 15%;
    background-color: ${props => props.theme.background};
`
