import React, { useCallback } from 'react'
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import globalStyles from '../config/globalStyles'
import colors from '../config/colors'
import MyFeather from '../components/MyFeather'
import MyFontAwesome from '../components/MyFontAwesome'
import MyButton from '../components/MyButton'
import logo from '../assets/temp_icon.png'
import { retrieveToken, signIn } from '../actions/auth'
import { Token } from '../reducers/auth'

const EmailInputField = ({
    onChangeText,
}: {
    onChangeText: (text: string) => void
}): JSX.Element => (
    <View style={{ ...globalStyles.userinput }}>
        <MyFontAwesome name="user-o" />
        <TextInput
            placeholder="Your Email"
            style={globalStyles.textinput}
            autoCapitalize="none"
            onChangeText={(text) => onChangeText(text)}
        />
    </View>
)

const PasswordInputField = ({
    secureTextEntry,
    onChangeText,
    onEyePress,
}: {
    secureTextEntry: boolean
    onChangeText: (text: string) => void
    onEyePress: () => void
}): JSX.Element => (
    <View style={{ ...globalStyles.userinput }}>
        <MyFontAwesome name="lock" />
        <TextInput
            placeholder="Your Password"
            secureTextEntry={secureTextEntry}
            style={globalStyles.textinput}
            autoCapitalize="none"
            onChangeText={(text) => onChangeText(text)}
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

function LoginScreen({ navigation }: { navigation: any }): JSX.Element {
    const auth: Token = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(retrieveToken(navigation))
    }, [])

    const [data, setData] = React.useState({
        email: '',
        password: '',
        securePasswordText: true,
    })

    function handleEmailInputChange(text: string): void {
        setData({
            ...data,
            email: text,
        })
    }

    function handlePasswordInputChange(text: string): void {
        setData({
            ...data,
            password: text,
        })
    }

    function handleSecurePasswordChange(): void {
        setData({
            ...data,
            securePasswordText: !data.securePasswordText,
        })
    }

    async function handleLoginButton(): Promise<void> {
        console.log('Signing In')
        dispatch(signIn(data.email, data.password, navigation))
    }

    function handleRegisterButton(): void {
        navigation.navigate('Register')
    }

    return (
        <View style={styles.background}>
            {/* Logo */}
            <Image style={styles.logo} source={logo} />

            {/* Email Input Field */}
            <EmailInputField onChangeText={handleEmailInputChange} />

            {/* Password Input Field */}
            <PasswordInputField
                secureTextEntry={data.securePasswordText}
                onChangeText={handlePasswordInputChange}
                onEyePress={handleSecurePasswordChange}
            />

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
})
