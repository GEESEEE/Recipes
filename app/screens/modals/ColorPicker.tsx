import React, { useState } from 'react'
import { View, Text, Modal } from 'react-native'
import styled from 'styled-components'
import { fromHsv, TriangleColorPicker } from 'react-native-color-picker'
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ButtonFilled, ReturnButton } from '../../components/user-input/Buttons'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { settingsActions } from '@/redux/actions'
import { colors } from '@/config'

interface ColorPickerProps {
    toggle: () => void
}

function ColorPickerModal({ toggle }: ColorPickerProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    const dispatch = useAppDispatch()

    const [localColor, setLocalColor] = useState<string>(colors.primary)

    const insets = useSafeAreaInsets()

    function setPrimaryColor(color: string): void {
        dispatch(settingsActions.setColor(color))
    }

    return (
        <Modal statusBarTranslucent animationType="slide">
            <Container
                style={{
                    paddingTop: insets.top,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                    paddingBottom: insets.bottom,
                }}
            >
                <ReturnButton onPress={() => toggle()} color={localColor} />

                <DifferenceContainer>
                    <SampleText style={{ color: localColor }}>
                        Change Primary Color
                    </SampleText>
                </DifferenceContainer>

                <Picker
                    style={{ borderColor: localColor }}
                    defaultColor={theme.primary}
                    oldColor={theme.primary}
                    onColorChange={(color: HsvColor) =>
                        setLocalColor(fromHsv(color))
                    }
                />

                <ConfirmContainer>
                    <ButtonFilled
                        text="Confirm"
                        onPress={() => {
                            setPrimaryColor(localColor)
                            toggle()
                        }}
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
    background-color: ${(props) => props.theme.background};
    align-items: center;
    margin-top: 0;
`

const DifferenceContainer = styled(View)`
    height: 5%;
    flex-direction: row;
    align-items: center;
`

const SampleText = styled(Text)`
    font-size: 20px;
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
    height: 8%;
    align-items: center;
    padding-top: 30px;
`

const FillRest = styled(View)`
    height: 10%;
    background-color: ${(props) => props.theme.background};
`
