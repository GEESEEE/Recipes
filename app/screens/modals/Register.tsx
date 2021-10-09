import React, { useReducer } from 'react'
import styled from 'styled-components'
import { authActions } from '@/redux/actions'
import { useAppDispatch, useAppSelector } from '@/hooks'

import { Button, IconButton, Icons, Error, Modal } from '@/components/atoms'
import { TextInputWithIcons } from '@/components/molecules'

const REGISTER_ACTIONS = {
    USERNAME_CHANGE: 'usernameChange',
    EMAIL_CHANGE: 'emailChange',
    PASSWORD1_CHANGE: 'password1Change',
    PASSWORD2_CHANGE: 'password2Change',
    PASSWORD_SECURE_CHANGE: 'passwordSecureChange',
}

interface RegisterState {
    username: string
    email: string
    password1: string
    password2: string
    securePasswordText: boolean
    isValidUsername: boolean
    isValidPassword1: boolean
    isValidPassword2: boolean
    isValidEmail: boolean
}

function reducer(state: RegisterState, action: any): RegisterState {
    switch (action.type) {
        case REGISTER_ACTIONS.USERNAME_CHANGE: {
            const { username, isValidUsername } = action.payload
            return { ...state, username, isValidUsername }
        }

        case REGISTER_ACTIONS.EMAIL_CHANGE: {
            const { email, isValidEmail } = action.payload
            return { ...state, email, isValidEmail }
        }

        case REGISTER_ACTIONS.PASSWORD1_CHANGE: {
            const { password1, isValidPassword1 } = action.payload
            return { ...state, password1, isValidPassword1 }
        }

        case REGISTER_ACTIONS.PASSWORD2_CHANGE: {
            const { password2, isValidPassword2 } = action.payload
            return { ...state, password2, isValidPassword2 }
        }

        case REGISTER_ACTIONS.PASSWORD_SECURE_CHANGE: {
            const { securePasswordText } = action.payload
            return { ...state, securePasswordText }
        }

        default:
            return state
    }
}

interface RegisterModalProps {
    navigation: any
    showLogin: () => void
}

function RegisterScreen({
    navigation,
    showLogin,
}: RegisterModalProps): JSX.Element {
    const { auth, settings } = useAppSelector((state) => state)
    const { theme } = settings
    const dispatch = useAppDispatch()

    const initialState: RegisterState = {
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
        const isValidUsername =
            (username.length >= 4 && username.length <= 30) ||
            username.length === 0
        localDispatch({
            type: REGISTER_ACTIONS.USERNAME_CHANGE,
            payload: { username, isValidUsername },
        })
    }

    function handleEmailInputChange(email: string): void {
        const regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/i
        const isValidEmail = regex.test(email)
        localDispatch({
            type: REGISTER_ACTIONS.EMAIL_CHANGE,
            payload: { email, isValidEmail },
        })
    }

    function handlePassword1InputChange(password1: string): void {
        const isValidPassword1 = password1.length >= 5 && password1.length <= 50
        localDispatch({
            type: REGISTER_ACTIONS.PASSWORD1_CHANGE,
            payload: { password1, isValidPassword1 },
        })
    }

    function handlePassword2InputChange(password2: string): void {
        const isValidPassword2 = password2.length >= 5 && password2.length <= 50
        localDispatch({
            type: REGISTER_ACTIONS.PASSWORD2_CHANGE,
            payload: { password2, isValidPassword2 },
        })
    }

    function handleSecurePassword1Change(): void {
        localDispatch({
            type: REGISTER_ACTIONS.PASSWORD_SECURE_CHANGE,
            payload: { securePasswordText: !data.securePasswordText },
        })
    }

    function isValidData(): boolean {
        const isEmpty =
            data.username.length === 0 ||
            data.email.length === 0 ||
            data.password1.length === 0 ||
            data.password2.length === 0
        return (
            !isEmpty &&
            data.isValidUsername &&
            data.isValidPassword1 &&
            data.isValidPassword2 &&
            data.isValidUsername &&
            samePasswords()
        )
    }

    function samePasswords(): boolean {
        return data.password1 === data.password2
    }

    async function handleRegisterButton(): Promise<void> {
        if (isValidData()) {
            const userData = {
                name: data.username,
                password: data.password1,
                email: data.email,
            }
            dispatch(authActions.signUp(userData, navigation))
        }
    }

    function handleGoBackButton(): void {
        showLogin()
        dispatch(authActions.clearError())
    }

    return (
        <Container backgroundColor={theme.background}>
            {/* Username Input Field */}

            <TextInputWithIcons
                onChangeText={(text: string) => handleUsernameInputChange(text)}
                placeholder="Username"
                errorMessage={
                    !data.isValidUsername ? 'Invalid Username' : undefined
                }
            />

            {/* Email Input Field */}
            <TextInputWithIcons
                onChangeText={(text: string) => handleEmailInputChange(text)}
                placeholder="E-mail"
                errorMessage={!data.isValidEmail ? 'Invalid Email' : undefined}
            />

            {/* Password 1 Input Field */}
            <TextInputWithIcons
                secureTextEntry={data.securePasswordText}
                onChangeText={(text: string) =>
                    handlePassword1InputChange(text)
                }
                placeholder="Password"
                rightIcon={
                    <IconButton
                        IconType={Icons.MyFeather}
                        iconName={data.securePasswordText ? 'eye-off' : 'eye'}
                        onPress={() => handleSecurePassword1Change()}
                        color={theme.grey}
                    />
                }
                errorMessage={
                    !data.isValidPassword1 ? 'Invalid Password' : undefined
                }
            />

            {/* Password 2 Input Field */}
            <TextInputWithIcons
                secureTextEntry
                onChangeText={(text: string) =>
                    handlePassword2InputChange(text)
                }
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
            <Button
                type="Solid"
                text="REGISTER"
                onPress={() => handleRegisterButton()}
                loading={auth.awaitingResponse}
                marginVertical="s"
            />

            <Error message={auth.error} />
            {/* Already have an account/Go Back Button */}
            <Button
                type="Clear"
                text="Already have an account?"
                textType="SubText"
                onPress={() => handleGoBackButton()}
            />
        </Container>
    )
}

export default RegisterScreen

const Container = styled(Modal)`
    align-items: center;
`
