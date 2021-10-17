import React, { useReducer } from 'react'
import { Dimensions, Image } from 'react-native'
import styled from 'styled-components'
import * as SecureStore from 'expo-secure-store'
import LoadingModal from './Loading'
import RegisterModal from './Register'
import logo from '@/assets/temp_icon.png'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Icon, Icons, View, Modal } from '@/components/base'
import { Button, IconButton, Error } from '@/components/atoms'
import { TextInputWithIcons } from '@/components/molecules'
import { authActions, userService, authService } from '@/redux'

const LOGIN_ACTIONS = {
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

    const dispatch = useAppDispatch()
    const [signIn, signInStatus] = authService.useSignInMutation()
    const [getUser, getUserStatus] = userService.useGetUserMutation()

    const [error, setError] = React.useState('')

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
            setError('')
            let res = await signIn(loginData)
            if ('data' in res) {
                const token = res.data.access_token
                await SecureStore.setItemAsync('token', token)

                res = await getUser(token)
                if ('data' in res) {
                    dispatch(authActions.login({ user: res.data, token }))
                    return
                }
            }

            const errorMessage =
                (res.error as any)?.data?.errors?.[0].message ??
                'Could not connect to the server'
            setError(errorMessage)
        }
    }

    function handleRegisterButton(): void {
        setDisplayRegisterScreen(true)
    }

    return (
        <Container backgroundColor={theme.background}>
            {getUserStatus.isLoading ? <LoadingModal /> : null}

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
                        Type={Icons.MyFontAwesome}
                        name="user-o"
                        color={theme.grey}
                    />
                }
                placeholder="Your Username or Email"
                onChangeText={(text: string) => handleUsernameInputChange(text)}
                errorMessage={
                    !data.isValidUsername
                        ? 'Invalid Username or Email'
                        : undefined
                }
            />

            <TextInputWithIcons
                leftIcon={
                    <IconButton
                        IconType={Icons.MyFontAwesome}
                        iconName="lock"
                        color={theme.grey}
                        onPress={() => console.log('asd')}
                    />
                }
                placeholder="Your Password"
                onChangeText={(text: string) => handlePasswordInputChange(text)}
                secureTextEntry={data.securePasswordText}
                rightIcon={
                    <IconButton
                        IconType={Icons.MyFeather}
                        iconName={data.securePasswordText ? 'eye-off' : 'eye'}
                        onPress={() => handleSecurePasswordChange()}
                        color={theme.grey}
                    />
                }
                errorMessage={
                    !data.isValidPassword ? 'Invalid Password' : undefined
                }
            />

            <Button
                type="Solid"
                text="Sign in"
                onPress={() => handleLoginButton()}
                loading={signInStatus.isLoading}
                marginVertical="s"
            />

            <Button
                type="Outline"
                text="Register"
                onPress={() => handleRegisterButton()}
                marginVertical="m"
            />

            <Error message={error} />
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
