import React, { useRef } from 'react'
import { Animated, Keyboard, TextInput as RNT } from 'react-native'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import Feather from 'react-native-vector-icons/Feather'
import { IfEquals, ReadonlyKeys, User } from '@recipes/api-types/v1'
import { SafeAreaView } from 'react-native-safe-area-context'
import { settingsActions } from '@/redux'
import { ButtonFilled } from '@/components/user-input/Buttons'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import { screenUtils } from '@/utils'
import {
    View,
    Text,
    TextInput,
    Icons,
    Toggle,
    Icon,
    TouchableOpacity,
} from '@/components/base'
import {
    Error,
    IconButton,
    Button,
    DropdownMenu,
    Editable,
    PressableTextWithElement,
} from '@/components/atoms'
import { InstructionListItem } from '@/components/molecules'
import { Instruction } from '@/data'
import { useUpdateSettingsMutation } from '@/redux/services/user'
import DragDropTest from '@/components/organisms/DragAndDropTest'

const bigLogo = 1
const smallLogo = 0.5

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
        screenUtils.showPopup(navigation, 'Yes')
    }

    const [username, setUsername] = React.useState('username')

    const [val, toggleVal] = useToggle(false)

    function tog(v: boolean): void {
        console.log('toggle', val, v)
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

            <Button
                type="Solid"
                text="Change Primary Color"
                onPress={() => changePrimaryColor()}
            />

            <DragDropTest />
        </Container>
    )
}

export default TestScreen

const Container = styled(SafeAreaView)`
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
