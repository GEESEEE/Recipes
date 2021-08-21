import React, { useRef } from 'react'
import { View, Text, Animated, Keyboard, TextInput } from 'react-native'
import styled from 'styled-components'
import logo from '../assets/temp_icon.png'

const bigLogo = 1
const smallLogo = 0.5

const TestScreen = (): JSX.Element => {
    console.log("Test Screen")

    const logoSize = useRef(new Animated.Value(bigLogo)).current

    const smallerLogo = (event: any): any => {
        console.log("Smaller Logo")
        Animated.timing(logoSize, {
            duration: event.duration,
            toValue: smallLogo,
            useNativeDriver: true
        }).start()
    }

    const biggerLogo = (event: any): void => {
        console.log("Bigger Logo")
        Animated.timing(logoSize, {
            duration: event.duration,
            toValue: bigLogo,
            useNativeDriver: true
        }).start()
    }

    React.useEffect(() => {

        const keyboardWillShow = Keyboard.addListener('keyboardDidShow', smallerLogo)
        const keyboardWillHide = Keyboard.addListener('keyboardDidHide', biggerLogo)

        return () => {
            keyboardWillShow.remove()
            keyboardWillHide.remove()
        }
    }, [])

    return (
        <Container>
            <LogoView>
                <Logo
                    source={logo}
                    style={{transform: [
                        {scaleY: logoSize},
                        {scaleX: logoSize},
                    ]}}
                />
            </LogoView>
            <SampleText >
                Test Screen
            </SampleText>
        </Container>
    )
}

export default TestScreen

const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
`

const SampleText = styled(TextInput)`
    color: ${(props) => props.theme.primary}
    background-color: ${(props) => props.theme.background};
    font-size: 20px;
    border-color: ${(props) => props.theme.primary}
    border-width: 1px;
    width: 100px;
    height: 100px;
`

const LogoView = styled(View)`
    position: absolute;
    top: 80px;
`
const Logo = styled(Animated.Image)`
    height: 200px;
    width: 200px;
`
