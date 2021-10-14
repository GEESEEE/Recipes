import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { authActions, settingsActions } from '@/redux'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import ColorPickerModal from '@/screens/modals/ColorPicker'
import { Toggle, Text, View, Icons, Icon } from '@/components/base'
import { Button, PressableTextWithElement } from '@/components/atoms'

export default function DrawerNavigator({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const { auth, settings } = useAppSelector((state) => state)
    const { user } = auth
    const { theme, invertedColors } = settings
    const dispatch = useAppDispatch()

    const [openColorPicker, toggleColorPicker] = useToggle(false)

    async function handleSignOut(): Promise<void> {
        await dispatch(authActions.signOut())
        navigation.toggleDrawer()
    }

    async function handleSetInvertedColor(val: boolean): Promise<void> {
        console.log("inverted", invertedColors, val)
        await dispatch(settingsActions.setInvertedColors(val))
    }

    async function handleSetTheme(val: boolean): Promise<void> {
        console.log("theme", theme.mode === 'light', val)
        await dispatch(settingsActions.setTheme(val))
    }

    return (
        <Container>
            {openColorPicker ? (
                <ColorPickerModal toggle={toggleColorPicker} />
            ) : null}

            <ScrollView>
                <Header>
                    <Text type='Header' color={theme.primary} >{user.name}</Text>
                    <Text paddingVertical='s' >{user.email}</Text>
                </Header>

                <ContainerView
                    paddingVertical='m'
                >
                    <PressableTextWithElement
                        text="Set Primary Color"
                        element={
                            <Icon
                                Type={Icons.MyIonicons}
                                name="color-palette-outline"
                                color={theme.primary}
                                size='m'
                            />
                        }
                        onPress={() => toggleColorPicker()}
                    />
                </ContainerView>

                <Text
                    type='SubHeader'
                    color={theme.primary}
                     weight='bold' paddingHorizontal='m'
                >Preferences</Text>
                <ContainerView
                    paddingVertical='m'
                >
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
                                    handleSetInvertedColor(val)
                                }
                            />
                        }
                    />
                </ContainerView>
            </ScrollView>

            <Footer>
                <Button
                    type='Solid'
                    text="Sign out"
                    onPress={() => handleSignOut()}
                    loading={auth.responsePending}
                    marginVertical='m'
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
