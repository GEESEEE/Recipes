import React, { useState } from 'react'
import styled from 'styled-components'
import { fromHsv, TriangleColorPicker } from 'react-native-color-picker'
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { settingsActions } from '@/redux'
import { colors } from '@/utils'
import { Modal, Text, Icons, View } from '@/components/base'
import { Button, IconButton } from '@/components/atoms'
import { useUpdateSettingsMutation } from '@/redux/services/user'

interface ColorPickerProps {
    toggle: () => void
}

function ColorPicker({ toggle }: ColorPickerProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    const dispatch = useAppDispatch()
    const [updateSettings] = useUpdateSettingsMutation()

    const [localColor, setLocalColor] = useState<string>(theme.primary)
    const headerText = 'Change Primary Color'

    async function setPrimaryColor(color: string): Promise<void> {
        dispatch(settingsActions.setColor(color))
        await updateSettings({ color })
    }

    return (
        <Container backgroundColor={theme.background}>
            <ReturnContainer paddingHorizontal="m">
                <IconButton
                    type={Icons.MyMaterialIcons}
                    name="arrow-back"
                    onPress={() => toggle()}
                    size="l"
                    color={localColor}
                />
            </ReturnContainer>
            <Text type="Header" color={localColor}>
                {headerText}
            </Text>
            <PickerContainer
                borderRadius="l"
                borderWidth="l"
                borderColor={localColor}
                marginVertical="l"
                paddingVertical="l"
                paddingHorizontal="l"
                width="l"
            >
                <Picker
                    style={{ borderColor: localColor }}
                    defaultColor={theme.primary}
                    oldColor={theme.primary}
                    onColorChange={(color: HsvColor) =>
                        setLocalColor(fromHsv(color))
                    }
                    color={localColor}
                />
            </PickerContainer>
            <ButtonRow marginVertical="l">
                <Button
                    type="Solid"
                    text="Blue"
                    color={colors.primaryBlue}
                    onPress={() => setLocalColor(colors.primaryBlue)}
                    width="s"
                />

                <Button
                    type="Solid"
                    text="Red"
                    color={colors.primaryRed}
                    onPress={() => setLocalColor(colors.primaryRed)}
                    width="s"
                    marginHorizontal="s"
                />

                <Button
                    type="Solid"
                    text="Green"
                    color={colors.primaryGreen}
                    onPress={() => setLocalColor(colors.primaryGreen)}
                    width="s"
                />
            </ButtonRow>

            <Button
                type="Solid"
                text="Save"
                marginVertical="m"
                color={localColor}
                onPress={() => {
                    setPrimaryColor(localColor)
                    toggle()
                }}
            />
        </Container>
    )
}

export default ColorPicker

const Container = styled(Modal)`
    align-items: center;
`

const ReturnContainer = styled(View)`
    width: 100%;
`

const PickerContainer = styled(View)`
    height: 60%;
`

const Picker = styled(TriangleColorPicker)`
    flex: 1;
`

const ButtonRow = styled(View)`
    flex-direction: row;
`
