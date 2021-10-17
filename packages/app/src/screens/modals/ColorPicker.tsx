import React, { useState } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { fromHsv, TriangleColorPicker } from 'react-native-color-picker'
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers'
import { ButtonFilled, ReturnButton } from '../../components/user-input/Buttons'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { settingsActions } from '@/redux'
import { colors } from '@/utils'
import { Modal } from '@/components/base'
import { useUpdateSettingsMutation } from '@/redux/services/user'

interface ColorPickerProps {
    toggle: () => void
}

function ColorPickerModal({ toggle }: ColorPickerProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    const dispatch = useAppDispatch()
    const [updateSettings] = useUpdateSettingsMutation()

    const [localColor, setLocalColor] = useState<string>(colors.primary)

    async function setPrimaryColor(color: string): Promise<void> {
        dispatch(settingsActions.setColor(color))
        await updateSettings({ color })
    }

    return (
        <Container backgroundColor={theme.background}>
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
    )
}

export default ColorPickerModal

const Container = styled(Modal)`
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