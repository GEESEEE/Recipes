import React from 'react'
import { View, ScrollView, Switch, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { signOut } from '../../actions/auth'
import { setTheme } from '../../actions/theme'
import { ButtonFilled } from '../user-input/Buttons'
import { MyFeather, MyIonicons } from '../Icons'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setInvertedColors } from '../../actions/settings'
import { useToggle } from '../../hooks'
import ColorPickerModal from '../user-input/ColorPickerModal'

interface RouteProps {
    icon: string | JSX.Element
    text: string
    onPress: () => void
}

const Route = ({icon, text, onPress}: RouteProps): JSX.Element => (
    <TouchableOpacity onPress={onPress} >
        <Section>
            <Paragraph>{text}</Paragraph>
            {icon}
        </Section>
    </TouchableOpacity>
)

const PreferenceSwitch = (
    text: string,
    switchValue: boolean,
    onValueChange: (val: boolean) => void
): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)

    return (
        <PreferenceItemView>
            <Paragraph>{text}</Paragraph>
            <Switch
                value={switchValue}
                onValueChange={onValueChange}
                trackColor={{
                    true: theme.backgroundVariant,
                    false: theme.backgroundVariant,
                }}
                thumbColor={theme.primary}
            />
        </PreferenceItemView>
    )
}

export default function Drawer({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const { user, auth, theme, settings } = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const [openColorPicker, toggleColorPicker] = useToggle(false)

    async function handleSignOut(): Promise<void> {
        dispatch(signOut(auth.token, navigation))
    }

    return (
        <Container>
            {
                openColorPicker
                ? <ColorPickerModal toggle={toggleColorPicker}/>
                : null
            }

            <ScrollView>
                <Header>
                    <Title>{user.name}</Title>
                    <Caption>{user.email}</Caption>
                </Header>

                <RoutesSection>
                    <Route
                        icon={
                            <MyIonicons
                                name="color-palette-outline"
                                color={theme.primary}
                                size={23}
                            />
                        }
                        text="Set Primary Color"
                        onPress={() => toggleColorPicker()}
                    />

                </RoutesSection>

                <PreferenceText>Preferences</PreferenceText>
                <PreferenceView>
                    {PreferenceSwitch(
                        'Light Theme',
                        theme.mode === 'light',
                        (val: boolean) => dispatch(setTheme(val))
                    )}
                    {PreferenceSwitch(
                        'Inverted Colors',
                        settings.invertedColors,
                        (val: boolean) => dispatch(setInvertedColors(val))
                    )}
                </PreferenceView>
            </ScrollView>

            <Footer>
                <ButtonFilled text="Sign Out" onPress={() => handleSignOut()} />
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

const Title = styled(Text)`
    font-size: 25px;
    margin-top: 3px;
    font-weight: bold;
    color: ${(props) => props.theme.primary};
`

const Caption = styled(Text)`
    font-size: 15px;
    color: ${(props) => props.theme.text};
`

const Paragraph = styled(Text)`
    font-size: 16px;
    margin-right: 3px;
    font-weight: bold;
    color: ${(props) => props.theme.text};
`

const RoutesSection = styled(View)`
    margin-top: 15px;
`

const Section = styled(View)`
    flex-direction: row;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 15px;
    padding-left: 12px;
    justify-content: space-between;
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

const PreferenceItemView = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 5px;
`

const Footer = styled(View)`
    margin-bottom: 15px;
    border-top-color: ${(props) => props.theme.primary};
    border-top-width: 1px;
    align-items: center;
`
