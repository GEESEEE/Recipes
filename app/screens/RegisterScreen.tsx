import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import colors from '../config/colors'
import globalStyles from '../config/globalStyles'
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
    <View style={globalStyles.userinput}>
        <TextInput
            placeholder="Username"
            style={{ ...globalStyles.textinput }}
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
    <View style={globalStyles.userinput}>
        <TextInput
            placeholder="E-mail"
            style={{ ...globalStyles.textinput }}
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
    <View style={{ ...globalStyles.userinput }}>
        <TextInput
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            style={globalStyles.textinput}
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

function RegisterScreen({ navigation }: { navigation: any }): JSX.Element {
    const dispatch = useDispatch()

    const [data, setData] = React.useState({
        username: '',
        email: '',
        password: '',
        securePasswordText: true,
        isValidUsername: true,
        isValidPassword: true,
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

    async function handleRegisterButton(): Promise<void> {
        if (data.isValidUsername && data.isValidPassword && data.isValidUsername) {
            const userData = {
                name: data.username,
                password: data.password,
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

            {/* Password Input Field */}
            <PasswordInputField
                secureTextEntry={data.securePasswordText}
                onChangeText={handlePasswordInputChange}
                onEyePress={handleSecurePasswordChange}
                onEndEditing={handlePasswordValidation}
            />
            {data.isValidPassword ? null : <Text style={styles.errorMessage}>Invalid password</Text>}

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
    errorMessage: {
        color: colors.red,
        fontSize: 10,
    }
})
