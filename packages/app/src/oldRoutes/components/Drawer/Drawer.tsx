import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { settingsActions } from '@/redux'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import { MyIonicons } from '@/components/Icons'
import { ColorPickerModal } from '@/screens/modals'
import { Toggle, Text } from '@/components/base'
import { Button } from '@/components/atoms'

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
        // await dispatch(authActions.signOut())
        navigation.toggleDrawer()
    }

    return (
        <Container>
            {openColorPicker ? (
                <ColorPickerModal toggle={toggleColorPicker} />
            ) : null}

            <ScrollView>
                <Header>
                    <Text type="Header" color={theme.primary}>
                        {user.name}
                    </Text>
                    <Text>{user.email}</Text>
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

                <Text
                    type="SubHeader"
                    color={theme.primary}
                    marginVertical="m"
                    weight="bold"
                    paddingHorizontal="m"
                >
                    Preferences
                </Text>
                <PreferenceView>
                    {/* Light Theme Toggle */}
                    <DrawerItem
                        text="Light Theme"
                        element={
                            <Toggle
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
                            <Toggle
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
                <Button
                    type="Solid"
                    text="SÍGN OUT"
                    onPress={() => handleSignOut()}
                    loading={auth.responsePending}
                    marginVertical="m"
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

const PreferenceView = styled(View)`
    flex-direction: column;
    justify-content: center;
    padding-vertical: 12px;
    padding-horizontal: 16px;
    border-top-color: ${(props) => props.theme.primary};
    border-top-width: 1px;
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
    border-top-color: ${(props) => props.theme.primary};
    border-top-width: 1px;
    align-items: center;
`
