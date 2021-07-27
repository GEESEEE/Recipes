import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {View, StyleSheet, ScrollView, Switch, Text, Settings } from 'react-native'
import {  } from 'react-navigation-drawer'
import { useDispatch, useSelector } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../config/colors'
import MyButton from '../components/MyButton'
import { signOut } from '../actions/auth'
import MyFeather from '../components/MyFeather'


export function DrawerContent({navigation} : {navigation: any}
): JSX.Element {
    const user = useSelector((state: any) => state.user)
    const auth = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()

    const [theme, setTheme] = React.useState(true)

    async function handleSignOut(): Promise<void> {
        dispatch(signOut(auth.token, navigation))
    }

    return  (
        <SafeAreaView
                style={styles.container}
        >
        <ScrollView>

                <View style={styles.header}>
                    <Text style={styles.title}>{user.name}</Text>
                    <Text style={styles.caption}>{user.email}</Text>
                </View>

                <View style={styles.RoutesSection}>
                    <View style={styles.section}>
                        <Feather name="settings" size={22} color={colors.darkgrey} />
                        <Text style={styles.paragraph}>Settings</Text>
                    </View>
                </View>


                <Text style={styles.preferenceText}>Preferences</Text>
                <View style={styles.preference}>
                    <View style={styles.darkTheme}>
                        <Text style={styles.paragraph}>Dark Theme</Text>
                        <Switch
                            value={theme}
                            onValueChange={(value: boolean) => setTheme(value)}
                            trackColor={{true: colors.primary, false: colors.grey}}
                        />
                    </View>
                </View>


            </ScrollView>
            <View style={styles.footer}>
                <MyButton text="Sign Out" onPress={handleSignOut}/>
            </View>
        </SafeAreaView>
    )
}

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
