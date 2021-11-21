import React, { useReducer } from 'react'
import { Dimensions, Image } from 'react-native'
import styled from 'styled-components'
import LoadingModal from './Loading'
import RegisterModal from './Register'
import logo from '@/assets/temp_icon.png'
import { useAppSelector, useLogin } from '@/hooks'
import { Icon, Icons, View, Modal } from '@/components/base'
import {
    Button,
    IconButton,
    Error,
    TextInputWithIcons,
} from '@/components/atoms'

export const LOGIN_ACTIONS = {
    USERNAME_CHANGE: 'usernameChange',
    PASSWORD_CHANGE: 'passwordChange',
    PASSWORD_SECURE_CHANGE: 'passwordSecureChange',
}

interface LoginState {
    username: string
    password: string
    securePasswordText: boolean
    isValidUsername: boolean
    isValidPassword: boolean
}

function reducer(state: LoginState, action: any): LoginState {
    switch (action.type) {
        case LOGIN_ACTIONS.USERNAME_CHANGE: {
            const { username, isValidUsername } = action.payload
            return { ...state, username, isValidUsername }
        }

        case LOGIN_ACTIONS.PASSWORD_CHANGE: {
            const { password, isValidPassword } = action.payload
            return { ...state, password, isValidPassword }
        }

        case LOGIN_ACTIONS.PASSWORD_SECURE_CHANGE: {
            const securePasswordText = action.payload
            return { ...state, securePasswordText }
        }

        default:
            return state
    }
}

function LoginModal(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    const [loginFunction, errorMessage, signInLoading, getUserLoading] =
        useLogin()

    const [displayRegisterScreen, setDisplayRegisterScreen] =
        React.useState(false)

    const initialState: LoginState = {
        username: '',
        password: '',
        securePasswordText: true,
        isValidUsername: true,
        isValidPassword: true,
    }

    const [data, localDispatch] = useReducer(reducer, initialState)

    function handleUsernameInputChange(username: string): void {
        const regex = /^[a-z0-9]+(@[a-z0-9]+\.[a-z0-9]+)?$/i
        const isValidUsername =
            (regex.test(username) &&
                username.length >= 4 &&
                username.length <= 30) ||
            username.length === 0
        localDispatch({
            type: LOGIN_ACTIONS.USERNAME_CHANGE,
            payload: { username, isValidUsername },
        })
    }

    function handlePasswordInputChange(password: string): void {
        const isValidPassword =
            (password.length >= 5 && password.length <= 50) ||
            password.length === 0
        localDispatch({
            type: LOGIN_ACTIONS.PASSWORD_CHANGE,
            payload: { password, isValidPassword },
        })
    }

    function handleSecurePasswordChange(): void {
        localDispatch({
            type: LOGIN_ACTIONS.PASSWORD_SECURE_CHANGE,
            payload: !data.securePasswordText,
        })
    }

    function isValidData(): boolean {
        const isEmpty = data.username.length === 0 || data.password.length === 0
        return !isEmpty && data.isValidUsername && data.isValidPassword
    }

    async function handleLoginButton(): Promise<void> {
        if (isValidData()) {
            const loginData = {
                username: data.username,
                password: data.password,
            }
            await loginFunction(loginData)
        }
    }

    return (
        <Container backgroundColor={theme.background}>
            {getUserLoading ? <LoadingModal /> : null}

            {displayRegisterScreen ? (
                <RegisterModal
                    showLogin={() => setDisplayRegisterScreen(false)}
                />
            ) : null}

            {/* Logo */}
            <View marginVertical="l" paddingVertical="l">
                <Logo source={logo} />
            </View>

            <TextInputWithIcons
                leftIcon={
                    <Icon
                        type={Icons.MyFontAwesome}
                        name="user-o"
                        color={theme.grey}
                    />
                }
                placeholder="Your Username or Email"
                onChangeText={(text: string) => handleUsernameInputChange(text)}
                error
                errorMessage={
                    !data.isValidUsername
                        ? 'Invalid Username or Email'
                        : undefined
                }
            />

            <TextInputWithIcons
                leftIcon={
                    <Icon
                        type={Icons.MyFontAwesome}
                        name="lock"
                        color={theme.grey}
                    />
                }
                placeholder="Your Password"
                onChangeText={(text: string) => handlePasswordInputChange(text)}
                secureTextEntry={data.securePasswordText}
                rightIcon={
                    <IconButton
                        type={Icons.MyFeather}
                        name={data.securePasswordText ? 'eye-off' : 'eye'}
                        onPress={() => handleSecurePasswordChange()}
                        color={theme.grey}
                    />
                }
                error
                errorMessage={
                    !data.isValidPassword ? 'Invalid Password' : undefined
                }
            />

            <Button
                type="Solid"
                text="Sign in"
                disabled={
                    !data.isValidPassword ||
                    !data.isValidUsername ||
                    data.password.length === 0 ||
                    data.username.length === 0
                }
                onPress={() => handleLoginButton()}
                loading={signInLoading}
                marginVertical="s"
            />

            <Button
                type="Outline"
                text="Register"
                onPress={() => setDisplayRegisterScreen(true)}
                marginVertical="m"
            />

            <Error message={errorMessage} />
        </Container>
    )
}

export default LoginModal

const { height } = Dimensions.get('screen')
const logoHeight = height * 0.2

const Container = styled(Modal)`
    align-items: center;
`

const Logo = styled(Image)`
    height: ${logoHeight}px;
    width: ${logoHeight}px;
`
