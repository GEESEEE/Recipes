import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text} from 'react-native'
import { useDispatch } from 'react-redux'
import { NavigationScreenProp } from 'react-navigation'
import colors from '../config/colors'
import MyFeather from '../components/MyFeather'
import MyButton from '../components/MyButton'
import { signUp } from '../actions/auth'

// #region Components

const UsernameInputField = ({
    onChangeText,
    onEndEditing
}: {
    onChangeText: (text: string) => void
    onEndEditing: (e: any) => void
}): JSX.Element => (
    <View style={styles.userinput}>
        <TextInput
            placeholder="Username"
            style={{ ...styles.textinput }}
            autoCapitalize="none"
            onChangeText={(text) => onChangeText(text)}
            onEndEditing={(e) => onEndEditing(e.nativeEvent.text)}
        />
    </View>
)

const EmailInputField = ({
    onChangeText,
    onEndEditing
}: {
    onChangeText: (text: string) => void
    onEndEditing: (e: any) => void
}): JSX.Element => (
    <View style={styles.userinput}>
        <TextInput
            placeholder="E-mail"
            style={{ ...styles.textinput }}
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
    onEndEditing
}: {
    secureTextEntry: boolean
    onChangeText: (text: string) => void
    onEyePress: () => void
    onEndEditing: (e: any) => void
}): JSX.Element => (
    <View style={{ ...styles.userinput }}>
        <TextInput
            placeholder="Password"
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

// #endregion

function RegisterScreen({ navigation }: { navigation: NavigationScreenProp<string> }): JSX.Element {
    const dispatch = useDispatch()

    const [data, setData] = React.useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
        securePassword1Text: true,
        securePassword2Text: true,
        isValidUsername: true,
        isValidPassword1: true,
        isValidPassword2: true,
        isValidEmail: true,
    })

    function handleUsernameInputChange(text: string): void {
        setData({
            ...data,
            username: text,
        })
    }

    function handleUsernameValidation(text: string): void {
        if (text.length >= 4 && text.length <= 30) {
            setData({
                ...data,
                isValidUsername: true
            })
        } else {
            setData({
                ...data,
                isValidUsername: false
            })
        }
    }

    function handleEmailInputChange(text: string): void {
        setData({
            ...data,
            email: text,
        })
    }

    function handleEmailValidation(text: string): void {
        const regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/i
        if (regex.test(text)) {
            setData({
                ...data,
                isValidEmail: true
            })
        } else {
            setData({
                ...data,
                isValidEmail: false
            })
        }
    }

    function handlePassword1InputChange(text: string): void {
        setData({
            ...data,
            password1: text,
        })
    }

    function handlePassword2InputChange(text: string): void {
        setData({
            ...data,
            password2: text,
        })
    }

    function handlePassword1Validation(text: string): void {
        if (text.length >= 5 && text.length <= 50) {
            setData({
                ...data,
                isValidPassword1: true
            })
        } else {
            setData({
                ...data,
                isValidPassword1: false
            })
        }
    }

    function handlePassword2Validation(text: string): void {
        if (text.length >= 5 && text.length <= 50) {
            setData({
                ...data,
                isValidPassword2: true
            })
        } else {
            setData({
                ...data,
                isValidPassword2: false
            })
        }
    }

    function handleSecurePassword1Change(): void {
        setData({
            ...data,
            securePassword1Text: !data.securePassword1Text,
        })
    }

    function handleSecurePassword2Change(): void {
        setData({
            ...data,
            securePassword2Text: !data.securePassword2Text,
        })
    }

    function samePasswords(): boolean {
        return  data.password1 === data.password2
    }

    function invalidPassWord(): JSX.Element | null{
        if (!data.isValidPassword1) {
            return (<Text style={styles.errorMessage}>Invalid Password 1</Text>)
        }
        if (!data.isValidPassword2) {
            return (<Text style={styles.errorMessage}>Invalid Password 2</Text>)
        }
        if (!samePasswords()) {
            return (<Text style={styles.errorMessage}>Passwords are not the same</Text>)
        }
        return null
    }

    async function handleRegisterButton(): Promise<void> {
        if (data.isValidUsername &&
            data.isValidPassword1 &&
            data.isValidPassword2 &&
            data.isValidUsername &&
            samePasswords()
        ) {
            const userData = {
                name: data.username,
                password: data.password1,
                email: data.email,
            }
            dispatch(signUp(userData, navigation))
        }

    }

    function handleGoBackButton(): void {
        navigation.goBack()
    }

    return (
        <View style={styles.background}>
            {/* Username Input Field */}
            <UsernameInputField onChangeText={handleUsernameInputChange} onEndEditing={handleUsernameValidation} />
            {data.isValidUsername ? null : <Text style={styles.errorMessage}>Invalid username</Text>}

            {/* Email Input Field */}
            <EmailInputField onChangeText={handleEmailInputChange} onEndEditing={handleEmailValidation} />
            {data.isValidEmail ? null : <Text style={styles.errorMessage}>Invalid E-mail</Text>}

            {/* Password 1 Input Field */}
            <PasswordInputField
                secureTextEntry={data.securePassword1Text}
                onChangeText={handlePassword1InputChange}
                onEyePress={handleSecurePassword1Change}
                onEndEditing={handlePassword1Validation}
            />

            {/* Password 2 Input Field */}
            <PasswordInputField
                secureTextEntry={data.securePassword2Text}
                onChangeText={handlePassword2InputChange}
                onEyePress={handleSecurePassword2Change}
                onEndEditing={handlePassword2Validation}
            />
            {invalidPassWord()}

            {/* Register Button */}
            <MyButton text="Register" onPress={handleRegisterButton} />

            {/* Already have an account/Go Back Button */}
            <MyButton
                text="Already have an account?"
                onPress={handleGoBackButton}
                inverted
            />
        </View>
    )
}

export default RegisterScreen

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
    errorMessage: {
        color: colors.red,
        fontSize: 10,
    }
})
