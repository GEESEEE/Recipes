import React from 'react'
import styled from 'styled-components'
import { Animated, StyleProp, ViewStyle } from 'react-native'
import { v4 as uuid } from 'uuid'
import { View, Text, TouchableOpacity } from '@/components/base'
import { LayoutProps } from '@/components/higher-order'
import { useSettings } from '@/hooks'
import { Spacing, Typography } from '@/styles'

type CustomToggleProps = {
    disabled?: boolean
    onValueChange?: (val: boolean) => void
    value?: boolean
} & LayoutProps

function CustomToggle({
    disabled,
    onValueChange,
    value,
    width,
    ...rest
}: CustomToggleProps): JSX.Element {
    const { theme, textSize } = useSettings()

    function onToggle() {
        if (typeof onValueChange !== 'undefined') {
            onValueChange(!value)
        }
    }
    console.log('Toggle, widht', width)
    const size = Typography.fontSize('Header', textSize)

    const [toggleValue] = React.useState(new Animated.Value(0))
    const animateToggle = (value: boolean) => {
        Animated.timing(toggleValue, {
            toValue: value ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start()
    }

    React.useEffect(() => {
        animateToggle(!!value)
    }, [value])

    const colorInterpolation = toggleValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.grey, theme.primary],
    })
    const translationInterpolation = toggleValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, size * 1.5],
    })

    const toggleStyle = [
        {
            transform: [{ translateX: translationInterpolation }],
            backgroundColor: colorInterpolation,
            height: size,
            width: size,
            borderRadius: Spacing.borderRadii['s'],
        },
    ]

    const toggleCopyStyle = {
        width: size,
        height: size,
    }

    const containerStyle = {
        width: size * 2.5,
    }

    return (
        <Container
            onPress={() => onToggle()}
            style={containerStyle}
            borderRadius="s"
            backgroundColor={theme.backgroundVariant}
            activeOpacity={1}
            {...rest}
        >
            <View style={toggleCopyStyle} />
            <Toggle key={uuid()} style={toggleStyle} />
        </Container>
    )
}

export default CustomToggle

const Container = styled(TouchableOpacity)``

const Toggle = styled(Animated.View)`
    position: absolute;
`
