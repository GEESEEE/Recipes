import React from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { authActions, settingsActions } from '@/actions'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import { ButtonFilled } from '@/components/user-input/Buttons'
import { MyIonicons } from '@/components/Icons'
import { ColorPickerModal } from '@/screens/modals'
import SwitchComponent from '@/components/user-input/Switch'

interface DrawerItemProps {
    text: string
    element: JSX.Element
    onPress?: () => void
}

const DrawerItem = ({
    text,
    element,
    onPress,
}: DrawerItemProps): JSX.Element => (
    <DrawerItemView onPress={onPress} disabled={typeof onPress === 'undefined'}>
        <DrawerItemText>{text}</DrawerItemText>
        <DrawerItemElement>{element}</DrawerItemElement>
    </DrawerItemView>
)

export default function DrawerComponent({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const { auth, settings } = useAppSelector((state) => state)
    const { user } = auth
    const { theme } = settings
    const dispatch = useAppDispatch()

    const [openColorPicker, toggleColorPicker] = useToggle(false)

    async function handleSignOut(): Promise<void> {
        await dispatch(authActions.signOut(user.token, navigation))
        navigation.toggleDrawer()
    }

    return (
        <Container>
            {openColorPicker ? (
                <ColorPickerModal toggle={toggleColorPicker} />
            ) : null}

            <ScrollView>
                <Header>
                    <HeaderName>{user.name}</HeaderName>
                    <HeaderEmail>{user.email}</HeaderEmail>
                </Header>

                <PreferenceView>
                    <DrawerItem
                        text="Set Primary Color"
                        element={
                            <MyIonicons
                                name="color-palette-outline"
                                color={theme.primary}
                                size={23}
                            />
                        }
                        onPress={() => toggleColorPicker()}
                    />
                </PreferenceView>

                <PreferenceText>Preferences</PreferenceText>
                <PreferenceView>
                    {/* Light Theme Toggle */}
                    <DrawerItem
                        text="Light Theme"
                        element={
                            <SwitchComponent
                                switchValue={theme.mode === 'light'}
                                onValueChange={(val: boolean) =>
                                    dispatch(settingsActions.setTheme(val))
                                }
                            />
                        }
                    />

                    {/* Inverted Colors Toggle */}
                    <DrawerItem
                        text="Inverted Colors"
                        element={
                            <SwitchComponent
                                switchValue={settings.invertedColors}
                                onValueChange={(val: boolean) =>
                                    dispatch(
                                        settingsActions.setInvertedColors(val)
                                    )
                                }
                            />
                        }
                    />
                </PreferenceView>
            </ScrollView>

            <Footer>
                <ButtonFilled
                    text="Sign Out"
                    onPress={() => handleSignOut()}
                    loading={auth.awaitingResponse}
                />
            </Footer>
        </Container>
    )
}

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props) => props.theme.background};
`

const Header = styled(View)`
    flex: 1;
    align-items: center;
    padding-bottom: 15px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.primary};
`

const HeaderName = styled(Text)`
    font-size: 25px;
    margin-top: 3px;
    font-weight: bold;
    color: ${(props) => props.theme.primary};
`

const HeaderEmail = styled(Text)`
    font-size: 15px;
    color: ${(props) => props.theme.text};
`

const PreferenceView = styled(View)`
    flex-direction: column;
    justify-content: center;
    padding-vertical: 12px;
    padding-horizontal: 16px;
    border-top-color: ${(props) => props.theme.primary};
    border-top-width: 1px;
`

const PreferenceText = styled(Text)`
    color: ${(props) => props.theme.primary};
    margin-top: 20px;
    margin-left: 10px;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: bold;
`

const DrawerItemView = styled(TouchableOpacity)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-bottom: 5px;
`

const DrawerItemText = styled(Text)`
    flex: 3;
    font-size: 16px;
    margin-right: 3px;
    font-weight: bold;
    color: ${(props) => props.theme.text};
`

const DrawerItemElement = styled(View)`
    flex: 1;
    align-items: center;
    align-content: center;
    justify-content: center;
`

const Footer = styled(View)`
    margin-bottom: 15px;
    border-top-color: ${(props) => props.theme.primary};
    border-top-width: 1px;
    align-items: center;
`
