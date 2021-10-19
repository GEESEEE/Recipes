import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components'
import * as SecureStore from 'expo-secure-store'
import { Theme } from '@recipes/api-types/v1'
import { authActions, settingsActions, authService, userService } from '@/redux'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import ColorPickerModal from '@/screens/modals/ColorPicker'
import { Toggle, Text, View, Icons, Icon } from '@/components/base'
import { Button, PressableTextWithElement } from '@/components/atoms'

type DrawerNavigatorProps = {
    navigation: any
}

export default function DrawerNavigator({
    navigation,
}: DrawerNavigatorProps): JSX.Element {
    const { auth, settings } = useAppSelector((state) => state)
    const { user } = auth
    const { theme, invertedColors } = settings

    const dispatch = useAppDispatch()
    const [signOut, signOutStatus] = authService.useSignOutMutation()
    const [updateSettings] = userService.useUpdateSettingsMutation()

    const [openColorPicker, toggleColorPicker] = useToggle(false)

    async function handleSignOut(): Promise<void> {
        const token = (await SecureStore.getItemAsync('token')) as string
        signOut(token)
        await SecureStore.deleteItemAsync('token')
        dispatch(authActions.logout())
        navigation.toggleDrawer()
    }

    async function handleSetTheme(val: boolean): Promise<void> {
        const newTheme = val ? Theme.LIGHT : Theme.DARK
        dispatch(settingsActions.setTheme(newTheme))
        await updateSettings({ theme: newTheme })
    }

    async function handleSetInvertedColors(val: boolean): Promise<void> {
        dispatch(settingsActions.setInvertedColors(val))
        await updateSettings({ invertedColors: val })
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
                    <Text paddingVertical="s">{user.email}</Text>
                </Header>

                <ContainerView paddingVertical="m">
                    <PressableTextWithElement
                        text="Set Primary Color"
                        element={
                            <Icon
                                Type={Icons.MyIonicons}
                                name="color-palette-outline"
                                color={theme.primary}
                                size="m"
                            />
                        }
                        onPress={() => toggleColorPicker()}
                    />
                </ContainerView>

                <Text
                    type="SubHeader"
                    color={theme.primary}
                    weight="bold"
                    paddingHorizontal="m"
                >
                    Preferences
                </Text>
                <ContainerView paddingVertical="m">
                    {/* Light Theme Toggle */}
                    <PressableTextWithElement
                        text="Light Theme"
                        element={
                            <Toggle
                                value={theme.mode === 'light'}
                                onValueChange={(val: boolean) =>
                                    handleSetTheme(val)
                                }
                            />
                        }
                    />

                    {/* Inverted Colors Toggle */}
                    <PressableTextWithElement
                        text="Inverted Colors"
                        element={
                            <Toggle
                                value={invertedColors}
                                onValueChange={(val: boolean) =>
                                    handleSetInvertedColors(val)
                                }
                            />
                        }
                    />
                </ContainerView>
            </ScrollView>

            <Footer>
                <Button
                    type="Solid"
                    text="Sign out"
                    onPress={() => handleSignOut()}
                    loading={signOutStatus.isLoading}
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
`

const ContainerView = styled(View)`
    flex-direction: column;
    justify-content: center;
    border-top-color: ${(props) => props.theme.primary};
    border-top-width: 1px;
`

const Footer = styled(View)`
    border-top-color: ${(props) => props.theme.primary};
    border-top-width: 1px;
    align-items: center;
`
