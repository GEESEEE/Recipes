import React, { useRef } from 'react'
import { Animated, Keyboard, TextInput as RNTextInput } from 'react-native'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import Feather from 'react-native-vector-icons/Feather'
import { settingsActions } from '@/redux/actions'
import { ButtonFilled } from '@/components/user-input/Buttons'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import { routeUtils } from '@/config'

import { View, Text, TextInput, Icon, Icons, IconButton, Toggle } from '@/components/atoms'
import { TextInputWithIcons } from '@/components/molecules'

import TestView from '@/components/atoms/TestView'


const bigLogo = 1
const smallLogo = 0.5

const TestScreen = ({ navigation }: { navigation: any }): JSX.Element => {
    const recipes = useAppSelector((state) => state.myRecipes)
    const { theme } = useAppSelector((state) => state.settings)
    const dispatch = useAppDispatch()
    const logoSize = useRef(new Animated.Value(bigLogo)).current

    const smallerLogo = (event: any): any => {
        // console.log('Smaller Logo')
        Animated.timing(logoSize, {
            duration: event.duration,
            toValue: smallLogo,
            useNativeDriver: true,
        }).start()
    }

    const biggerLogo = (event: any): void => {
        // console.log('Bigger Logo')
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
            dispatch(settingsActions.setColor('#fc5c65'))
        } else {
            dispatch(settingsActions.setColor('#4ecdc4'))
        }
    }

    function showPopup(): void {
        routeUtils.showPopup(navigation, 'Yes')
    }

    const [loading, toggle] = useToggle(false)

    const [username, setUsername] = React.useState('')

    function changeUsername(text: string): void {
        setUsername(text)
        console.log(text)
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
            {/* <SampleText
                editable={false}
                paddingVertical='s'
            >
                Jup
            </SampleText>

            <SampleIcon
                name='menu'
            />

            <SampleTest
            >
                JAAAA
            </SampleTest> */}


            <StyledTestView
                backgroundColor={theme.primary}
            >
                <RNTextInput>
                    JAAA
                </RNTextInput>
                <RNTextInput>
                    Oef
                </RNTextInput>
            </StyledTestView>

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

const StyledTestView = styled(TestView)`
    border-width: 1px;
    border-color: ${(props) => props.theme.primary};
`

const LottieAnimation = styled(LottieView)`
    width: 50%;
    height: 20%;
`

const LogoView = styled(View)`
    position: absolute;
    top: 80px;
`
const Logo = styled(Animated.Image)`
    height: 200px;
    width: 200px;
`
