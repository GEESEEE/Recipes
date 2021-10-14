import React, { useRef } from 'react'
import { Animated, Keyboard } from 'react-native'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import Feather from 'react-native-vector-icons/Feather'
import { settingsActions } from '@/redux'
import { ButtonFilled } from '@/components/user-input/Buttons'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import { routeUtils } from '@/config'
import { View, Text, TextInput, Icons, Toggle } from '@/components/base'

import {
    Error,
    IconButton,
    Button,
    DropdownMenu,
    Editable,
    PressableTextWithElement
} from '@/components/atoms'
import { TextInputWithIcons, InstructionListItem } from '@/components/molecules'
import { Instruction } from '@/data'

const bigLogo = 1
const smallLogo = 0.5

const TestScreen = ({ navigation }: { navigation: any }): JSX.Element => {
    // const { recipes } = useAppSelector((state) => state.myRecipes)

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

    const [username, setUsername] = React.useState('username')

    const [val, toggleVal] = useToggle(false)

    function tog(v: boolean): void {
        console.log("toggle", val, v)
        toggleVal(v)
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

            <StyledTextInput
                width='s'
                value='lkmasdlkmasdlkmasdlkmasdlk'
                paddingVertical='s'
                multiline
            />

            <PressableTextWithElement
                text='Yes'
                element={<Toggle
                    value={val}
                    onValueChange={(v: boolean) => tog(v)}
                />}
            />

            <StyledText width="s" numberOfLines={2} paddingVertical="s" transform='uppercase' >
                lkamsdlkmasdlkamsdlkasasdasdadadad
            </StyledText>

            <Button
                type="Solid"
                text="Change Primary Color"
                onPress={() => changePrimaryColor()}
            />

            <StyledText width="s" paddingVertical="s" numberOfLines={1}>
                Teextkjansdknlkamsdlkmasdlkmasdlkmasdlkansdlkmasda
            </StyledText>
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

const StyledTextInput = styled(TextInput)`
    border-width: 1px;
    border-color: ${(props) => props.theme.primary};
`

const StyledText = styled(Text)`
    border-width: 1px;
    border-color: ${(props) => props.theme.primary};
`

const StyledError = styled(Error)`
    border-width: 1px;
    border-color: ${(props) => props.theme.primary};
`

const LogoView = styled(View)`
    position: absolute;
    top: 80px;
`
const Logo = styled(Animated.Image)`
    height: 200px;
    width: 200px;
`
