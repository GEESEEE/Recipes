import React, { useRef } from 'react'
import { View, Animated, Keyboard, TextInput } from 'react-native'
import styled from 'styled-components'
import { setColor } from '../actions/theme'
import { ButtonFilled } from '../components/user-input/Buttons'
import { useAppDispatch, useAppSelector } from '../hooks'

const bigLogo = 1
const smallLogo = 0.5

const TestScreen = ({ navigation }: { navigation: any }): JSX.Element => {
    const recipes = useAppSelector((state) => state.myRecipes)
    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const logoSize = useRef(new Animated.Value(bigLogo)).current

    const smallerLogo = (event: any): any => {
        console.log('Smaller Logo')
        Animated.timing(logoSize, {
            duration: event.duration,
            toValue: smallLogo,
            useNativeDriver: true,
        }).start()
    }

    const biggerLogo = (event: any): void => {
        console.log('Bigger Logo')
        Animated.timing(logoSize, {
            duration: event.duration,
            toValue: bigLogo,
            useNativeDriver: true,
        }).start()
    }

    React.useEffect(() => {
        const keyboardWillShow = Keyboard.addListener(
            'keyboardDidShow',
            smallerLogo
        )
        const keyboardWillHide = Keyboard.addListener(
            'keyboardDidHide',
            biggerLogo
        )

        return () => {
            keyboardWillShow.remove()
            keyboardWillHide.remove()
        }
    }, [])

    function logRecipes(): void {
        console.log('Recipes', recipes)
    }

    function changePrimaryColor(): void {
        if (theme.primary === '#4ecdc4') {
            dispatch(setColor('#fc5c65'))
        } else {
            dispatch(setColor('#4ecdc4'))
        }
    }

    function handleDrawer(): void {
        navigation.openDrawer()
    }

    return (
        <Container>
            {/* <LogoView>
                <Logo
                    source={logo}
                    style={{
                        transform: [{ scaleY: logoSize }, { scaleX: logoSize }],
                    }}
                />
            </LogoView> */}
            <SampleText>Test Screen</SampleText>
            <ButtonFilled text="Log recipes" onPress={() => logRecipes()} />
            <ButtonFilled text="Drawer" onPress={() => handleDrawer()} />
            <ButtonFilled
                text="Change Primary Color"
                onPress={() => changePrimaryColor()}
            />
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
    height: 50px;
    width: 100px;
    font-size: 16px;
    color: ${(props) => props.theme.primary}
    border-width: 1px;
    border-color: ${(props) => props.theme.primary}
`

const LogoView = styled(View)`
    position: absolute;
    top: 80px;
`
const Logo = styled(Animated.Image)`
    height: 200px;
    width: 200px;
`
