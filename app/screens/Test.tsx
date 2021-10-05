import React, { useRef } from 'react'
import { Animated, Keyboard, TextInput as RNTextInput } from 'react-native'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import Feather from 'react-native-vector-icons/Feather'
import { settingsActions } from '@/redux/actions'
import { ButtonFilled } from '@/components/user-input/Buttons'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import { routeUtils } from '@/config'
import {
    Text,
    View,
    Button,
    Icon,
    TextInput,
    IconButton,
    ErrorMessage
} from '@/components/atoms'

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
    const [errorMessage, setErrorMessage] = React.useState('Error Jwz')

    function toggleError(): void {
        if (errorMessage.length > 0) setErrorMessage('')
        else setErrorMessage('Error Jwz')
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
            <StyledView marginVertical="s">
                <StyledText type="Text" weight="bold">
                    Yes
                </StyledText>
            </StyledView>

            <Button
                marginVertical="m"
                type="Solid"
                text="Log Recipes"
                textType="Text"
                color={theme.error}
                onPress={() => toggle()}
                loading={loading}
            />

            <Icon Type={Feather} name="image" size="l" color={theme.error} />
            <IconButton
                onPress={() => console.log('Icon Button')}
                IconType={Feather}
                iconName="image"
                size="s"
                color={theme.grey}
                paddingVertical="m"
            />
            <SampleText
                type="Text"
                weight="bold"
                backgroundColor={theme.background}
                roundness="s"
            >
                Goeie test dit
            </SampleText>
            <ErrorMessage
                errorMessage={errorMessage}
                size='m'
            />
            <Button type='Solid' text="LOG RECIPES" onPress={() => logRecipes()} marginVertical='m' width='m' />
            <ButtonFilled text="ToggleError" onPress={() => toggleError()} />
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
    border-width: 1px;
    border-color: ${(props) => props.theme.primary};
`

const Sample = styled(RNTextInput)`
    color: ${(props) => props.theme.primary}
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

const StyledText = styled(Text)`
    border-width: 1px;
    border-color: ${(props) => props.theme.primary};
`

const StyledView = styled(View)`
    border-width: 1px;
    border-color: ${(props) => props.theme.primary};
`
