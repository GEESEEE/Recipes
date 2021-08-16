import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationScreenProp } from 'react-navigation'
import {View, StyleSheet, ScrollView, Switch, Text, TouchableOpacity } from 'react-native'
import {  } from 'react-navigation-drawer'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../config/colors'
import MyButton from '../components/MyButton'
import { signOut } from '../actions/auth'
import { setTheme } from '../actions/theme'


const Route = (iconName: string, text: string): JSX.Element => (
        <TouchableOpacity>
            <View style={styles.section}>
                <Feather name={iconName} size={22} color={colors.darkgrey} />
                <Text style={styles.paragraph}>{text}</Text>
            </View>
        </TouchableOpacity>
    )


export function DrawerContent({navigation} : {navigation: NavigationScreenProp<string>}
): JSX.Element {
    const user = useSelector((state: any) => state.user)
    const auth = useSelector((state: any) => state.auth)
    const theme = useSelector((state: any) => state.theme)
    const dispatch = useDispatch()

    async function handleSignOut(): Promise<void> {
        dispatch(signOut(auth.token, navigation))
    }

    return  (
        <Container>
            <ScrollView>

                <Header>
                    <Title>{user.name}</Title>
                    <Text style={styles.caption}>{user.email}</Text>
                </Header>

                <View style={styles.RoutesSection}>
                    {Route("settings", "Settings")}
                </View>


                <Text style={styles.preferenceText}>Preferences</Text>
                <View style={styles.preference}>
                    <View style={styles.darkTheme}>
                        <Text style={styles.paragraph}>Dark Theme</Text>
                        <Switch
                            value={theme.mode === 'light'}
                            onValueChange={(value: boolean) => dispatch(setTheme(value))}
                            trackColor={{true: colors.primary, false: colors.grey}}
                        />
                    </View>
                </View>


            </ScrollView>
            <View style={styles.footer}>
                <MyButton text="Sign Out" onPress={handleSignOut}/>
            </View>
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
    fontSize: 15px;
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
    marginRight: 15px;
    marginLeft: 15ps;
    justifyContent: space-between;
`

const PreferenceView = styled(View)`
    color: ${(props) => props.theme.primary};
    marginTop: 20px;
    marginLeft: 10px;
    marginBottom: 5px;
    fontSize: 16px;
    fontWeight: bold;
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


const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
    },
    title: {
        fontSize: 25,
        marginTop: 3,
        fontWeight: 'bold',
        color: colors.primary
    },
    caption: {
        fontSize: 15,
        color: colors.darkgrey
    },
    RoutesSection: {
        marginTop: 15,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginLeft: 15,
        justifyContent: 'space-between',
    },
    paragraph: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 3,
        color: colors.darkgrey
    },

    preferenceText: {
        color: colors.primary,
        marginTop: 20,
        marginLeft: 10,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopColor: colors.primary,
        borderTopWidth: 1,
    },
    darkTheme: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer: {
        marginBottom: 15,
        borderTopColor: colors.primary,
        borderTopWidth: 1,
        alignItems: 'center',
    },

})
