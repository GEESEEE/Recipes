import React from 'react'
import styled from 'styled-components'
import { Animated, LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native'
import { v4 as uuid } from 'uuid'
import { View, TouchableOpacity } from '@/components/base'
import { LayoutProps } from '@/components/higher-order'
import { useSettings } from '@/hooks'
import { Spacing, Typography } from '@/styles'

type CustomToggleProps = {
    disabled?: boolean
    onValueChange?: (val: boolean) => void
    value?: boolean
} & LayoutProps

function Toggle({
    disabled,
    onValueChange,
    value,
    paddingVertical = 'n',
    borderRadius = 's',
    width,
    ...rest
}: CustomToggleProps): JSX.Element {
    const { theme, textSize } = useSettings()

    function onToggle() {
        if (typeof onValueChange !== 'undefined') {
            onValueChange(!value)
        }
    }

    const size = Typography.fontSize('Header', textSize)
    const [newWidth, setWidth] = React.useState(size * 2.5)
    const toggleSize = size + 2 * Spacing.spacings[paddingVertical]

    const [toggleValue] = React.useState(new Animated.Value(0))

    const animateToggle = (value: boolean) => {
        Animated.timing(toggleValue, {
            toValue: value ? newWidth - toggleSize : 0,
            duration: 150,
            useNativeDriver: true,
        }).start()
    }

    React.useEffect(() => {
        animateToggle(!!value)
    }, [value])

    const toggleStyle = [
        {
            transform: [{ translateX: toggleValue }],
            backgroundColor: value ? theme.primary : theme.grey,
            height: toggleSize,
            width: toggleSize,
            borderRadius: Spacing.borderRadii[borderRadius],
        },
    ]

    const toggleCopyStyle = {
        width: size,
        height: size,
    }

    const containerStyle: StyleProp<ViewStyle> = {}
    if (typeof width === 'undefined') {
        containerStyle.width = newWidth
    }

    return (
        <TouchableOpacity
            onPress={() => {
                if (!disabled) {
                    onToggle()
                }
            }}
            backgroundColor={theme.backgroundVariant}
            style={containerStyle}
            activeOpacity={1}
            onLayout={(e: LayoutChangeEvent) =>
                setWidth(e.nativeEvent.layout.width)
            }
            width={width}
            borderRadius={borderRadius}
            paddingVertical={paddingVertical}
            {...rest}
        >
            <View style={toggleCopyStyle} />
            <ToggleView key={uuid()} style={toggleStyle} />
        </TouchableOpacity>
    )
}

export default Toggle

const ToggleView = styled(Animated.View)`
    position: absolute;
`
