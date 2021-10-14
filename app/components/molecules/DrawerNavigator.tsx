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
    const { theme } = settings
    const dispatch = useAppDispatch()

    const [openColorPicker, toggleColorPicker] = useToggle(false)

    async function handleSignOut(): Promise<void> {
        await dispatch(authActions.signOut())
        navigation.toggleDrawer()
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
                    paddingHorizontal='m'
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
                    paddingHorizontal='m'
                    paddingVertical='m'
                >
                    {/* Light Theme Toggle */}
                    <PressableTextWithElement
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
                    <PressableTextWithElement
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
                </ContainerView>
            </ScrollView>

            <Footer>
                <Button
                    type='Solid'
                    text="SIGN OUT"
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
