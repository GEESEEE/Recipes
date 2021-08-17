import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native'
import { useDispatch } from 'react-redux'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
import colors from '../config/colors'
import { signUp } from '../actions/auth'
import { ButtonBorderless, ButtonFilled } from '../components/Buttons'
import { MyFeather } from '../components/Icons'
import { InputFieldRounded } from '../components/TextInputs'


function RegisterScreen({ navigation }: { navigation: NavigationScreenProp<string> }): JSX.Element {
    const dispatch = useDispatch()

    const [data, setData] = React.useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
        securePasswordText: true,
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

    function handlePasswordValidation(password1: boolean, text: string): void {
        let valid = false
        if (text.length >= 5 && text.length <= 50) {
            valid = true
        }

        if (password1) {
            setData({
                ...data,
                isValidPassword1: valid
            })
        } else {
            setData({
                ...data,
                isValidPassword2: valid
            })
        }
    }

    function handleSecurePassword1Change(): void {
        setData({
            ...data,
            securePasswordText: !data.securePasswordText,
        })
    }

    function samePasswords(): boolean {
        return data.password1 === data.password2
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
        <Container>
            {/* Username Input Field */}
            <InputFieldRounded
                onChangeText={handleUsernameInputChange}
                onEndEditing={handleUsernameValidation}
                placeholder="Username"
            />
            {data.isValidUsername ? null : <Text style={styles.errorMessage}>Invalid username</Text>}

            {/* Email Input Field */}
            <InputFieldRounded
                onChangeText={handleEmailInputChange}
                onEndEditing={handleEmailValidation}
                placeholder="E-mail"
            />
            {data.isValidEmail ? null : <Text style={styles.errorMessage}>Invalid E-mail</Text>}

            {/* Password 1 Input Field */}
            <InputFieldRounded
                secureTextEntry={data.securePasswordText}
                onChangeText={handlePassword1InputChange}
                onEndEditing={(text) => handlePasswordValidation(true, text)}
                placeholder="Password"
                rightIcon={
                    <TouchableOpacity onPress={handleSecurePassword1Change}>
                        {data.securePasswordText ? (
                            <MyFeather name="eye-off" color={colors.grey} />
                        ) : (
                            <MyFeather name="eye" color={colors.grey} />
                        )}
                    </TouchableOpacity>
                }
            />

            {/* Password 2 Input Field */}
            <InputFieldRounded
                secureTextEntry
                onChangeText={handlePassword2InputChange}
                onEndEditing={(text) => handlePasswordValidation(false, text)}
                placeholder="Password"
            />
            {invalidPassWord()}

            {/* Register Button */}
            <ButtonFilled text="Register" onPress={handleRegisterButton} />

            {/* Already have an account/Go Back Button */}
            <ButtonBorderless
                text="Already have an account?"
                onPress={handleGoBackButton}
            />
        </Container>
    )
}

export default RegisterScreen

const Container = styled(View)`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${(props) => props.theme.background}
`

const styles = StyleSheet.create({
    errorMessage: {
        color: colors.red,
        fontSize: 10,
    }
})
