import React, { useReducer } from 'react'
import { View, Dimensions, TouchableOpacity, Animated } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
import colors from '../config/colors'
import { MyFeather, MyFontAwesome } from '../components/Icons'
import logo from '../assets/temp_icon.png'
import { clearError, retrieveToken, signIn } from '../actions/auth'
import { ButtonFilled, ButtonInverted } from '../components/user-input/Buttons'
import { InputFieldRounded } from '../components/user-input/TextInputs'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { ErrorMessage } from '../components/user-input/ErrorMessage'

const LOGIN_ACTIONS = {
    USERNAME_CHANGE: 'usernameChange',
    PASSWORD_CHANGE: 'passwordChange',
    PASSWORD_SECURE_CHANGE: 'passwordSecureChange',
}

function reducer(state: any, action: any): any {
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

function LoginScreen({
    navigation,
}: {
    navigation: NavigationScreenProp<string>
}): JSX.Element {
    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(retrieveToken(navigation))
    }, [])

    const initialState = {
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
        const isEmpty = data.username.length === 0 && data.password.length === 0
        return !isEmpty && data.isValidUsername && data.isValidPassword
    }

    async function handleLoginButton(): Promise<void> {
        if (isValidData()) {
            dispatch(signIn(data.username, data.password, navigation))
        }
    }

    function handleRegisterButton(): void {
        navigation.navigate('Register')
        dispatch(clearError())
    }

    return (
        <Container>
            {/* Logo */}
            <LogoView>
                <Logo source={logo} />
            </LogoView>

            {/* Email Input Field */}
            <InputFieldRounded
                leftIcon={<MyFontAwesome name="user-o" />}
                onChangeText={(text: string) => handleUsernameInputChange(text)}
                placeholder="Your Username or Email"
                errorMessage={
                    !data.isValidUsername
                        ? 'Invalid Username or Email'
                        : undefined
                }
            />

            {/* Password Input Field */}
            <InputFieldRounded
                leftIcon={<MyFontAwesome name="lock" />}
                secureTextEntry={data.securePasswordText}
                onChangeText={(text: string) => handlePasswordInputChange(text)}
                placeholder="Your Password"
                rightIcon={
                    <TouchableOpacity onPress={() => handleSecurePasswordChange()}>
                        {data.securePasswordText ? (
                            <MyFeather name="eye-off" color={colors.grey} />
                        ) : (
                            <MyFeather name="eye" color={colors.grey} />
                        )}
                    </TouchableOpacity>
                }
                errorMessage={
                    !data.isValidPassword ? 'Invalid Password' : undefined
                }
            />

            {/* Log in Button */}
            <ButtonFilled text="Sign in" onPress={() => handleLoginButton()} />

            {/* Register Button */}
            <ButtonInverted text="Register" onPress={() => handleRegisterButton()} />
            <ErrorMessage errorMessage={auth.error} />
        </Container>
    )
}

export default LoginScreen

const { height } = Dimensions.get('screen')
const logoHeight = height * 0.2

const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
`

const LogoView = styled(View)`
    position: absolute;
    top: 80px;
`

const Logo = styled(Animated.Image)`
    height: ${logoHeight}px;
    width: ${logoHeight}px;
`
