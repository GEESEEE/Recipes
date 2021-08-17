import React, { useReducer } from 'react'
import {
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
import colors from '../config/colors'
import {MyFeather, MyFontAwesome} from '../components/Icons'
import logo from '../assets/temp_icon.png'
import { retrieveToken, signIn } from '../actions/auth'
import { ButtonFilled, ButtonInverted } from '../components/Buttons'
import { InputFieldRounded } from '../components/TextInputs'
import { useAppDispatch } from '../types/ReduxHooks'

const LOGIN_ACTIONS = {
    USERNAME_CHANGE: 'usernameChange',
    PASSWORD_CHANGE: 'passwordChange',
    USERNAME_VALIDATION: 'usernameValidation',
    PASSWORD_VALIDATION: 'passwordValidation',
    PASSWORD_SECURE_CHANGE: 'passwordSecureChange'
}

function reducer(state: any, action: any): any {
    switch (action.type) {
        case LOGIN_ACTIONS.USERNAME_CHANGE: {
            const username = action.payload
            return {...state, username}
        }

        case LOGIN_ACTIONS.PASSWORD_CHANGE: {
            const password = action.payload
            return {...state, password}
        }

        case LOGIN_ACTIONS.PASSWORD_SECURE_CHANGE: {
            const securePasswordText = action.payload
            return {...state, securePasswordText}
        }

        case LOGIN_ACTIONS.USERNAME_VALIDATION: {
            const isValidUsername = action.payload
            return {...state, isValidUsername}
        }

        case LOGIN_ACTIONS.PASSWORD_VALIDATION: {
            const isValidPassword = action.payload
            return {...state, isValidPassword}
        }

        default:
            return state
    }
}

function LoginScreen({ navigation }: { navigation: NavigationScreenProp<string> }): JSX.Element {
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

    function handleUsernameInputChange(text: string): void {
        localDispatch({type: LOGIN_ACTIONS.USERNAME_CHANGE, payload: text})
    }

    function handleUsernameValidation(text: string): void {
        const regex = /^[a-z0-9]+(@[a-z0-9]+\.[a-z0-9]+)?$/i
        localDispatch({
            type: LOGIN_ACTIONS.USERNAME_VALIDATION,
            payload: (regex.test(text) && text.length >= 4 && text.length <= 30)
        })
    }

    function handlePasswordInputChange(text: string): void {
        localDispatch({type: LOGIN_ACTIONS.PASSWORD_CHANGE, payload: text})
    }

    function handlePasswordValidation(text: string): void {
        localDispatch({
            type: LOGIN_ACTIONS.PASSWORD_VALIDATION,
            payload: (text.length >= 5 && text.length <= 50)
        })
    }

    function handleSecurePasswordChange(): void {
        localDispatch({ type: LOGIN_ACTIONS.PASSWORD_SECURE_CHANGE, payload: !data.securePasswordText})
    }

    async function handleLoginButton(): Promise<void> {
        if (data.isValidUsername && data.isValidPassword) {
            dispatch(signIn(data.username, data.password, navigation))
        }
    }

    function handleRegisterButton(): void {
        navigation.navigate('Register')
    }

    return (
        <Container>
            {/* Logo */}
            <Logo source={logo} />

            {/* Email Input Field */}
            <InputFieldRounded
                leftIcon={<MyFontAwesome name="user-o" />}
                onChangeText={handleUsernameInputChange}
                onEndEditing={handleUsernameValidation}
                placeholder="Your Username or Email"
                errorMessage={!data.isValidUsername ? 'Invalid Username or Email' : undefined}
            />

            {/* Password Input Field */}
            <InputFieldRounded
                leftIcon={<MyFontAwesome name="lock" />}
                secureTextEntry={data.securePasswordText}
                onChangeText={handlePasswordInputChange}
                onEndEditing={handlePasswordValidation}
                placeholder="Your Password"
                rightIcon={
                <TouchableOpacity onPress={handleSecurePasswordChange}>
                    {data.securePasswordText ? (
                        <MyFeather name="eye-off" color={colors.grey} />
                    ) : (
                        <MyFeather name="eye" color={colors.grey} />
                    )}
                </TouchableOpacity>}
                errorMessage={!data.isValidPassword ? 'Invalid Password' : undefined}
            />

            {/* Log in Button */}
            <ButtonFilled text="Sign in" onPress={handleLoginButton} />

            {/* Register Button */}
            <ButtonInverted text="Register" onPress={handleRegisterButton}/>

        </Container>
    )
}

export default LoginScreen

const { height } = Dimensions.get('screen')
const logoHeight = height * 0.15

const Container = styled(View)`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${(props) => props.theme.background}
`

const Logo = styled(Image)`
    width: ${logoHeight}px;
    height: ${logoHeight}px;
    position: absolute;
    top: ${height * 0.08}px;
`

