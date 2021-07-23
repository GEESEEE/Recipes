import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import colors from '../config/colors'
import globalStyles from '../config/globalStyles'
import MyFeather from '../components/MyFeather'
import MyButton from '../components/MyButton'
import { signUp } from '../actions/auth'

// #region Components

const UsernameInputField = ({
    onChangeText,
}: {
    onChangeText: (text: string) => void
}): JSX.Element => (
    <View style={globalStyles.userinput}>
        <TextInput
            placeholder="Username"
            style={{ ...globalStyles.textinput }}
            autoCapitalize="none"
            onChangeText={(text) => onChangeText(text)}
        />
    </View>
)

const EmailInputField = ({
    onChangeText,
}: {
    onChangeText: (text: string) => void
}): JSX.Element => (
    <View style={globalStyles.userinput}>
        <TextInput
            placeholder="E-mail"
            style={{ ...globalStyles.textinput }}
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
        <TextInput
            placeholder="Password"
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

// #endregion

function RegisterScreen({ navigation }: { navigation: any }): JSX.Element {
    const dispatch = useDispatch()

    const [data, setData] = React.useState({
        username: '',
        email: '',
        password: '',
        securePasswordText: true,
    })

    function handleUsernameInputChange(text: string): void {
        setData({
            ...data,
            username: text,
        })
    }

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

    async function handleRegisterButton(): Promise<void> {
        const userData = {
            name: data.username,
            password: data.password,
            email: data.email,
        }
        dispatch(signUp(userData, navigation))
    }

    function handleGoBackButton(): void {
        navigation.goBack()
    }

    return (
        <View style={styles.background}>
            {/* Username Input Field */}
            <UsernameInputField onChangeText={handleUsernameInputChange} />

            {/* Email Input Field */}
            <EmailInputField onChangeText={handleEmailInputChange} />

            {/* Password Input Field */}
            <PasswordInputField
                secureTextEntry={data.securePasswordText}
                onChangeText={handlePasswordInputChange}
                onEyePress={handleSecurePasswordChange}
            />

            {/* Register Button */}
            <MyButton text="Register" onPress={handleRegisterButton} />

            {/* Already have an account/Go Back Button */}
            <MyButton
                text="Already have an account?"
                onPress={handleGoBackButton}
                viewStyle={styles.goBackButtonView}
                textStyle={styles.goBackButtonText}
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
    goBackButtonView: {
        backgroundColor: colors.white,
    },
    goBackButtonText: {
        color: colors.primary,
        textTransform: 'none',
        fontSize: 12,
    },
})
