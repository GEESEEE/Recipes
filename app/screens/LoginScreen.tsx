import React from 'react'
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Text,
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import colors from '../config/colors'
import {MyFeather, MyFontAwesome} from '../components/Icons'
import logo from '../assets/temp_icon.png'
import { retrieveToken, signIn } from '../actions/auth'
import { ButtonFilled, ButtonInverted } from '../components/Buttons'
import { InputFieldRounded } from '../components/TextInputs'


function LoginScreen({ navigation }: { navigation: NavigationScreenProp<string> }): JSX.Element {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(retrieveToken(navigation))
    }, [])

    const [data, setData] = React.useState({
        username: '',
        password: '',
        securePasswordText: true,
        isValidUsername: true,
        isValidPassword: true,
    })

    function handleUsernameInputChange(text: string): void {
        setData({
            ...data,
            username: text,
        })
    }

    function handleUsernameValidation(text: string): void {
        const regex = /^[a-z0-9]+(@[a-z0-9]+\.[a-z0-9]+)?$/i
        if (regex.test(text) && text.length >= 4 && text.length <= 30) {
            setData({
                ...data,
                username: text,
                isValidUsername: true
            })
        } else {
            setData({
                ...data,
                isValidUsername: false
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
                password: text,
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
            <Image style={styles.logo} source={logo} />

            {/* Email Input Field */}
            <InputFieldRounded
                leftIcon={<MyFontAwesome name="user-o" />}
                onChangeText={handleUsernameInputChange}
                onEndEditing={handleUsernameValidation}
                placeholder="Your Username or Email"
            />
            {data.isValidUsername ? null : <Text style={styles.errorMessage}>Invalid Username</Text>}

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
            />
            {data.isValidPassword ? null : <Text style={styles.errorMessage}>Invalid Password</Text>}

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

const styles = StyleSheet.create({
    logo: {
        width: logoHeight,
        height: logoHeight,
        position: 'absolute',
        top: height * 0.08,
    },
    errorMessage: {
        color: colors.red,
        fontSize: 10,
    }
})
