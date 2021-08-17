import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {View, ScrollView, Switch, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { signOut } from '../actions/auth'
import { setTheme } from '../actions/theme'
import { Theme } from '../reducers/theme'
import { ButtonFilled } from '../components/Buttons'
import { MyFeather } from '../components/Icons'

const Route = (iconName: string, text: string, theme: Theme): JSX.Element => (
    <TouchableOpacity>
        <Section>
            <MyFeather name={iconName} color={theme.text} />
            <Paragraph>{text}</Paragraph>
        </Section>
    </TouchableOpacity>
)

const PreferenceSwitch = (text: string, switchValue: boolean): JSX.Element => {
    const dispatch = useDispatch()
    const theme = useSelector((state: any) => state.theme)

    return (
    <DarkThemeView>
        <Paragraph>{text}</Paragraph>
        <Switch
            value={switchValue}
            onValueChange={(value: boolean) => dispatch(setTheme(value))}
            trackColor={{true: theme.backgroundVariant, false: theme.backgroundVariant}}
            thumbColor={theme.primary}
        />
    </DarkThemeView>
)}


export function DrawerContent({navigation} : {navigation: any}
): JSX.Element {
    const user = useSelector((state: any) => state.user)
    const auth = useSelector((state: any) => state.auth)
    const theme: Theme = useSelector((state: any) => state.theme)
    const dispatch = useDispatch()

    async function handleSignOut(): Promise<void> {
        dispatch(signOut(auth.token, navigation))
    }

    return  (
        <Container>
            <ScrollView>

                <Header>
                    <Title>{user.name}</Title>
                    <Caption>{user.email}</Caption>
                </Header>

                <RoutesSection>
                    {Route("settings", "Settings", theme)}
                </RoutesSection>


                <PreferenceText>Preferences</PreferenceText>
                <PreferenceView>
                    {PreferenceSwitch("Dark Theme", theme.mode === 'dark')}
                </PreferenceView>


            </ScrollView>
            <Footer>
                <ButtonFilled text="Sign Out" onPress={handleSignOut}/>
            </Footer>
        </Container>
    )
}

const Container = styled(SafeAreaView)`
    flex: 1;
    backgroundColor: ${(props) => props.theme.background};
`

const Header = styled(View)`
    flex: 1;
    alignItems: center;
    paddingBottom: 15px;
    borderBottomWidth: 1px;
    borderBottomColor: ${(props) => props.theme.primary};
`

const Title = styled(Text)`
    fontSize: 25px;
    marginTop: 3px;
    fontWeight: bold;
    color: ${(props) => props.theme.primary};
`

const Caption = styled(Text)`
    fontSize: 15px;
    color: ${(props) => props.theme.text};
`

const Paragraph = styled(Text)`
    fontSize: 16px;
    marginRight: 3px;
    fontWeight: bold;
    color: ${(props) => props.theme.text};
`

const RoutesSection = styled(View)`
    marginTop: 15px;
`

const Section = styled(View)`
    flexDirection: row;
    alignItems: center;
    paddingTop: 10px;
    paddingBottom: 10px;
    paddingRight: 12px;
    paddingLeft: 12px;
    justifyContent: space-between;

`

const PreferenceView = styled(View)`
    flexDirection: row;
    justifyContent: center;
    paddingVertical: 12px;
    paddingHorizontal: 16px;
    borderTopColor: ${(props) => props.theme.primary};
    borderTopWidth: 1px;
`

const PreferenceText = styled(Text)`
    color: ${(props) => props.theme.primary};
    marginTop: 20px;
    marginLeft: 10px;
    marginBottom: 5px;
    fontSize: 16px;
    fontWeight: bold;
`

const DarkThemeView = styled(View)`
    flex: 1;
    flexDirection: row;
    justifyContent: space-between;
`

const Footer = styled(View)`
    marginBottom: 15px;
    borderTopColor: ${(props) => props.theme.primary};
    borderTopWidth: 1px;
    alignItems: center;
`

