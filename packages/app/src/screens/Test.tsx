import React, { useRef } from 'react'
import { Animated, Keyboard } from 'react-native'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import Feather from 'react-native-vector-icons/Feather'
import { fit } from '@recipes/api-types/v1'
import { settingsActions } from '@/redux'
import { ButtonFilled } from '@/components/user-input/Buttons'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import { routeUtils } from '@/utils'
import { View, Text, TextInput, Icons, Toggle } from '@/components/base'

import {
    Error,
    IconButton,
    Button,
    DropdownMenu,
    Editable,
    PressableTextWithElement,
} from '@/components/atoms'
import { TextInputWithIcons, InstructionListItem } from '@/components/molecules'
import { Instruction, User } from '@/data'
import { useUpdateSettingsMutation } from '@/redux/services/user'

const bigLogo = 1
const smallLogo = 0.5

class A {
    constructor(x = 0, y = 0) {
        this.a1 = x
        this.a2 = y
    }
    public a1!: number
    public a2!: number
}

class AB {
    constructor(x = 0) {
        this.a2 = x
    }
    public a2!: number
}

class B {
    constructor(a = new A(), b = new AB(), x = 1, y = 1, z = 1) {
        this.a = a
        this.x = x
        this.y = y
        this.z = z
        this.b = b
    }

    public a!: A
    public b!: AB
    public x!: number
    public y!: number
    public z!: number
}

class C {
    constructor(y = 0, a = new AB(), b = null) {
        this.y = y
        this.a = a
        this.b = b
    }

    public y!: number
    public a!: AB
    public b!: AB | null
}

const TestScreen = ({ navigation }: { navigation: any }): JSX.Element => {
    // const { recipes } = useAppSelector((state) => state.myRecipes)

    const [updateSettings] = useUpdateSettingsMutation()

    const { settings } = useAppSelector((state) => state)

    const { theme } = settings
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

    async function setPrimaryColor(color: string): Promise<void> {
        dispatch(settingsActions.setColor(color))
        await updateSettings({ color })
    }

    function changePrimaryColor(): void {
        if (theme.primary === '#4ecdc4') {
            setPrimaryColor('#fc5c65')
        } else {
            setPrimaryColor('#4ecdc4')
        }
    }

    function showPopup(): void {
        routeUtils.showPopup(navigation, 'Yes')
    }

    const [username, setUsername] = React.useState('username')

    const [val, toggleVal] = useToggle(false)

    function tog(v: boolean): void {
        console.log('toggle', val, v)
        toggleVal(v)
    }

    function testFit(): void {
        const point = new B()
        const res = fit(point, C)
        console.log('res fit', res)
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

            <Button
                type="Solid"
                text="Change Primary Color"
                onPress={() => changePrimaryColor()}
            />

            <Button
                marginVertical="m"
                type="Solid"
                text="Test Fit"
                onPress={() => testFit()}
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
