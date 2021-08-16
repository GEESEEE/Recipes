import React from 'react'
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Text,
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { useDispatch } from 'react-redux'
import colors from '../config/colors'
import MyFeather from '../components/MyFeather'
import MyFontAwesome from '../components/MyFontAwesome'
import MyButton from '../components/MyButton'
import logo from '../assets/temp_icon.png'
import { retrieveToken, signIn } from '../actions/auth'


const EmailInputField = ({
    onChangeText,
    onEndEditing
}: {
    onChangeText: (text: string) => void
    onEndEditing: (e: any) => void
}): JSX.Element => (
    <View style={{ ...styles.userinput }}>
        <MyFontAwesome name="user-o" />
        <TextInput
            placeholder="Your Username or Email"
            style={styles.textinput}
            autoCapitalize="none"
            onChangeText={(text) => onChangeText(text)}
            onEndEditing={(e) => onEndEditing(e.nativeEvent.text)}
        />
    </View>
)

const PasswordInputField = ({
    secureTextEntry,
    onChangeText,
    onEyePress,
    onEndEditing,
}: {
    secureTextEntry: boolean
    onChangeText: (text: string) => void
    onEyePress: () => void
    onEndEditing: (e: any) => void
}): JSX.Element => (
    <View style={{ ...styles.userinput }}>
        <MyFontAwesome name="lock" />
        <TextInput
            placeholder="Your Password"
            secureTextEntry={secureTextEntry}
            style={styles.textinput}
            autoCapitalize="none"
            onChangeText={(text) => onChangeText(text)}
            onEndEditing={(e) => onEndEditing(e.nativeEvent.text)}
        />
        <TouchableOpacity onPress={onEyePress}>
            {secureTextEntry ? (
                <MyFeather name="eye-off" color={colors.grey} />
            ) : (
                <MyFeather name="eye" color={colors.grey} />
            )}
        </TouchableOpacity>
    </View>
)

function LoginScreen({ navigation }: { navigation: NavigationScreenProp<string> }): JSX.Element {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(retrieveToken(navigation))
    }, [])

    const [data, setData] = React.useState({
        username: '',
        password: '',
        securePasswordText: true,
        isValidUsername: true,
        isValidPassword: true,
    })

    function handleUsernameInputChange(text: string): void {
        setData({
            ...data,
            username: text,
        })
    }

    function handleUsernameValidation(text: string): void {
        const regex = /^[a-z0-9]+(@[a-z0-9]+\.[a-z0-9]+)?$/i
        if (regex.test(text) && text.length >= 4 && text.length <= 30) {
            setData({
                ...data,
                username: text,
                isValidUsername: true
            })
        } else {
            setData({
                ...data,
                isValidUsername: false
            })
        }
    }

    function handlePasswordInputChange(text: string): void {
        setData({
            ...data,
            password: text,
        })
    }

    function handlePasswordValidation(text: string): void {
        if (text.length >= 5 && text.length <= 50) {
            setData({
                ...data,
                password: text,
                isValidPassword: true
            })
        } else {
            setData({
                ...data,
                isValidPassword: false
            })
        }
    }

    function handleSecurePasswordChange(): void {
        setData({
            ...data,
            securePasswordText: !data.securePasswordText,
        })
    }

    async function handleLoginButton(): Promise<void> {
        if (data.isValidUsername && data.isValidPassword) {
            dispatch(signIn(data.username, data.password, navigation))
        }
    }

    function handleRegisterButton(): void {
        navigation.navigate('Register')
    }

    return (
        <View style={styles.background}>
            {/* Logo */}
            <Image style={styles.logo} source={logo} />

            {/* Email Input Field */}
            <EmailInputField onChangeText={handleUsernameInputChange} onEndEditing={handleUsernameValidation}/>
            {data.isValidUsername ? null : <Text style={styles.errorMessage}>Invalid Username</Text>}

            {/* Password Input Field */}
            <PasswordInputField
                secureTextEntry={data.securePasswordText}
                onChangeText={handlePasswordInputChange}
                onEyePress={handleSecurePasswordChange}
                onEndEditing={handlePasswordValidation}
            />
            {data.isValidPassword ? null : <Text style={styles.errorMessage}>Invalid Password</Text>}

            {/* Log in Button */}
            <MyButton text="Sign in" onPress={handleLoginButton} />

            {/* Register Button */}
            <MyButton
                text="Register"
                onPress={handleRegisterButton}
                viewStyle={styles.registerButtonView}
                textStyle={styles.registerButtonText}
            />
        </View>
    )
}

export default LoginScreen

const { height } = Dimensions.get('screen')
const logoHeight = height * 0.15

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    userinput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        marginTop: 8,
        marginBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 20,
        backgroundColor: colors.lightergrey,
    },
    textinput: {
        flex: 1,
        paddingLeft: 10,
        color: colors.black,
    },
    logo: {
        width: logoHeight,
        height: logoHeight,
        position: 'absolute',
        top: height * 0.08,
    },
    registerButtonView: {
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 2,
    },
    registerButtonText: {
        color: colors.primary,
    },
    errorMessage: {
        color: colors.red,
        fontSize: 10,
    }
})
