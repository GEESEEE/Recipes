import React, { useReducer } from 'react'
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native'
import { useDispatch } from 'react-redux'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
import colors from '../config/colors'
import { signUp } from '../actions/auth'
import { ButtonBorderless, ButtonFilled } from '../components/Buttons'
import { MyFeather } from '../components/Icons'
import { InputFieldRounded } from '../components/TextInputs'

const REGISTER_ACTIONS = {
    USERNAME_CHANGE: 'usernameChange',
    EMAIL_CHANGE: 'emailChange',
    PASSWORD1_CHANGE: 'password1Change',
    PASSWORD2_CHANGE: 'password2Change',
    PASSWORD_SECURE_CHANGE: 'passwordSecureChange',
    USERNAME_VALIDATION: 'usernameValidation',
    PASSWORD1_VALIDATION: 'password1Validation',
    PASSWORD2_VALIDATION: 'password2Validation',
    EMAIL_VALIDATION: 'emailValidation'
}

function reducer(state: any, action: any): any {
    switch (action.type) {
        case REGISTER_ACTIONS.USERNAME_CHANGE: {
            const username = action.payload
            return {...state, username}
        }

        case REGISTER_ACTIONS.EMAIL_CHANGE: {
            const email = action.payload
            return {...state, email}
        }

        case REGISTER_ACTIONS.PASSWORD1_CHANGE: {
            const password1 = action.payload
            return {...state, password1}
        }

        case REGISTER_ACTIONS.PASSWORD2_CHANGE: {
            const password2 = action.payload
            return {...state, password2}
        }

        case REGISTER_ACTIONS.PASSWORD_SECURE_CHANGE: {
            const securePasswordText = action.payload
            return {...state, securePasswordText}
        }

        case REGISTER_ACTIONS.USERNAME_VALIDATION: {
            const isValidUsername = action.payload
            return {...state, isValidUsername}
        }

        case REGISTER_ACTIONS.PASSWORD1_VALIDATION: {
            const isValidPassword1 = action.payload
            return {...state, isValidPassword1}
        }

        case REGISTER_ACTIONS.PASSWORD2_VALIDATION: {
            const isValidPassword2 = action.payload
            return {...state, isValidPassword2}
        }

        case REGISTER_ACTIONS.EMAIL_VALIDATION: {
            const isValidEmail = action.payload
            return {...state, isValidEmail}
        }

        default:
            return state
    }

}

function RegisterScreen({ navigation }: { navigation: NavigationScreenProp<string> }): JSX.Element {
    const dispatch = useDispatch()

    const initialState = {
        username: '',
        email: '',
        password1: '',
        password2: '',
        securePasswordText: true,
        isValidUsername: true,
        isValidPassword1: true,
        isValidPassword2: true,
        isValidEmail: true,
    }

    const [data, localDispatch] = useReducer(reducer, initialState)

    function handleUsernameInputChange(text: string): void {
        localDispatch({type: REGISTER_ACTIONS.USERNAME_CHANGE, payload: text})
    }

    function handleUsernameValidation(text: string): void {
        localDispatch({type: REGISTER_ACTIONS.USERNAME_VALIDATION, payload: (text.length >= 4 && text.length <= 30)})
    }

    function handleEmailInputChange(text: string): void {
        localDispatch({type: REGISTER_ACTIONS.EMAIL_CHANGE, payload: text})
    }

    function handleEmailValidation(text: string): void {
        const regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/i
        localDispatch({type: REGISTER_ACTIONS.EMAIL_VALIDATION, payload: regex.test(text)})
    }

    function handlePassword1InputChange(text: string): void {
        localDispatch({type: REGISTER_ACTIONS.PASSWORD1_CHANGE, payload: text})
    }

    function handlePassword2InputChange(text: string): void {
        localDispatch({type: REGISTER_ACTIONS.PASSWORD2_CHANGE, payload: text})
    }

    function handlePasswordValidation(password1: boolean, text: string): void {
        const valid = (text.length >= 5 && text.length <= 50)
        if (password1) {
            localDispatch({type: REGISTER_ACTIONS.PASSWORD1_VALIDATION, payload: valid})
        } else {
            localDispatch({type: REGISTER_ACTIONS.PASSWORD2_VALIDATION, payload: valid})
        }
    }

    function handleSecurePassword1Change(): void {
        localDispatch({type: REGISTER_ACTIONS.PASSWORD_SECURE_CHANGE, payload: !data.securePasswordText})
    }

    function samePasswords(): boolean {
        return data.password1 === data.password2
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
                errorMessage={!data.isValidUsername ? 'Invalid Username' : undefined}
            />
            {}

            {/* Email Input Field */}
            <InputFieldRounded
                onChangeText={handleEmailInputChange}
                onEndEditing={handleEmailValidation}
                placeholder="E-mail"
                errorMessage={!data.isValidEmail ? 'Invalid Email' : undefined}
            />

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
                errorMessage={!data.isValidPassword1 ? 'Invalid Password' : undefined}
            />

            {/* Password 2 Input Field */}
            <InputFieldRounded
                secureTextEntry
                onChangeText={handlePassword2InputChange}
                onEndEditing={(text) => handlePasswordValidation(false, text)}
                placeholder="Password"
                errorMessage={!data.isValidPassword2 ? 'Invalid Password' :
                !samePasswords() ? 'Passwords are not the same' : undefined}
            />

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
