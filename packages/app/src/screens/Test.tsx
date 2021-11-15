import React, { useRef } from 'react'
import { Animated, Keyboard, TextInput as RNT } from 'react-native'
import styled from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    fitToClass,
    Recipe,
    Instruction,
    RecipeIngredient,
    Section,
} from '@recipes/api-types/v1'
import { settingsActions } from '@/redux'
import { useAppDispatch, useSettings, useToggle } from '@/hooks'
import { screenUtils } from '@/utils'
import { View, Text, TextInput } from '@/components/base'
import { Error, Button } from '@/components/atoms'

import { userService } from '@/redux'
import DragDropTest from '@/components/organisms/DragAndDropTest'

const bigLogo = 1
const smallLogo = 0.5

const TestScreen = ({ navigation }: { navigation: any }): JSX.Element => {
    // const { recipes } = useAppSelector((state) => state.myRecipes)

    function mergeTest(): void {
        console.log('\n\nStarting Merging\n')
    }

    const [updateSettings] = userService.useUpdateSettingsMutation()

    const settings = useSettings()

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
        screenUtils.showPopup(
            navigation,
            'Are you sure you want to stop editing this Recipe'
        )
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

            <Button
                marginVertical="m"
                type="Solid"
                text="Merge test"
                onPress={() => showPopup()}
            />
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
