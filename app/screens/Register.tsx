import React, { useReducer } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
import colors from '../config/colors'
import { signUp } from '../actions/auth'
import { ButtonBorderless, ButtonFilled } from '../components/user-input/Buttons'
import { MyFeather } from '../components/Icons'
import { InputFieldRounded } from '../components/user-input/TextInputs'
import { useAppDispatch } from '../hooks/redux'

const REGISTER_ACTIONS = {
    USERNAME_CHANGE: 'usernameChange',
    EMAIL_CHANGE: 'emailChange',
    PASSWORD1_CHANGE: 'password1Change',
    PASSWORD2_CHANGE: 'password2Change',
    PASSWORD_SECURE_CHANGE: 'passwordSecureChange',
}

function reducer(state: any, action: any): any {
    switch (action.type) {
        case REGISTER_ACTIONS.USERNAME_CHANGE: {
            const {username, isValidUsername} = action.payload
            return { ...state, username, isValidUsername }
        }

        case REGISTER_ACTIONS.EMAIL_CHANGE: {
            const {email, isValidEmail} = action.payload
            return { ...state, email, isValidEmail }
        }

        case REGISTER_ACTIONS.PASSWORD1_CHANGE: {
            const {password1, isValidPassword1} = action.payload
            return { ...state, password1, isValidPassword1 }
        }

        case REGISTER_ACTIONS.PASSWORD2_CHANGE: {
            const {password2, isValidPassword2} = action.payload
            return { ...state, password2, isValidPassword2 }
        }

        case REGISTER_ACTIONS.PASSWORD_SECURE_CHANGE: {
            const {securePasswordText} = action.payload
            return { ...state, securePasswordText }
        }

        default:
            return state
    }
}

function RegisterScreen({
    navigation,
}: {
    navigation: NavigationScreenProp<string>
}): JSX.Element {
    const dispatch = useAppDispatch()

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

    function handleUsernameInputChange(username: string): void {
    	const isValidUsername = (username.length >= 4 && username.length <= 30) || username.length === 0
        localDispatch({ type: REGISTER_ACTIONS.USERNAME_CHANGE, payload: {username, isValidUsername} })
    }

    function handleEmailInputChange(email: string): void {
        const regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/i
        const isValidEmail =  regex.test(email)
        localDispatch({ type: REGISTER_ACTIONS.EMAIL_CHANGE, payload: {email, isValidEmail} })
    }

    function handlePassword1InputChange(password1: string): void {
        const isValidPassword1 = password1.length >= 5 && password1.length <= 50
        localDispatch({
            type: REGISTER_ACTIONS.PASSWORD1_CHANGE,
            payload: {password1, isValidPassword1},
        })
    }

    function handlePassword2InputChange(password2: string): void {
        const isValidPassword2 = password2.length >= 5 && password2.length <= 50
        localDispatch({
            type: REGISTER_ACTIONS.PASSWORD2_CHANGE,
            payload: {password2, isValidPassword2},
        })
    }

    function handleSecurePassword1Change(): void {
        localDispatch({
            type: REGISTER_ACTIONS.PASSWORD_SECURE_CHANGE,
            payload: !data.securePasswordText,
        })
    }

    function samePasswords(): boolean {
        return data.password1 === data.password2
    }

    async function handleRegisterButton(): Promise<void> {
        if (
            data.isValidUsername &&
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
                placeholder="Username"
                errorMessage={
                    !data.isValidUsername ? 'Invalid Username' : undefined
                }
            />
            {}

            {/* Email Input Field */}
            <InputFieldRounded
                onChangeText={handleEmailInputChange}
                placeholder="E-mail"
                errorMessage={!data.isValidEmail ? 'Invalid Email' : undefined}
            />

            {/* Password 1 Input Field */}
            <InputFieldRounded
                secureTextEntry={data.securePasswordText}
                onChangeText={handlePassword1InputChange}
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
                errorMessage={
                    !data.isValidPassword1 ? 'Invalid Password' : undefined
                }
            />

            {/* Password 2 Input Field */}
            <InputFieldRounded
                secureTextEntry
                onChangeText={handlePassword2InputChange}
                placeholder="Password"
                errorMessage={
                    !data.isValidPassword2
                        ? 'Invalid Password'
                        : !samePasswords()
                        ? 'Passwords are not the same'
                        : undefined
                }
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
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
`
