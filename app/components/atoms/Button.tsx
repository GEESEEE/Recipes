import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components'
import Text from './Text'
import View from './View'
import { withPaddingAndMargins, PaddingAndMarginProps } from '@/components/higher-order'
import { Loading4Dots } from '@/components/animations'
import { Typography, Buttons, Spacing } from '@/styles'
import { useAppSelector } from '@/hooks'

type ButtonProps = {
    type: Buttons.ButtonType
    color?: string
    backgroundColor?: string

    text: string
    textType?: Typography.TextType
    textWeight?: Typography.TextWeight

    roundness?: Spacing.Size
    width?: Spacing.Size

    loading?: boolean
    onPress: () => void
}
& PaddingAndMarginProps
& TouchableOpacityProps

const Button = ({
    type,
    color,
    backgroundColor,

    text,
    textType,
    textWeight,

    width,
    roundness,

    loading,
    onPress,
    disabled,
    ...rest
}: ButtonProps): JSX.Element => {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings

    color = color || theme.primary
    if (disabled) {
        color = theme.grey
    }
    backgroundColor = backgroundColor || theme.background
    const borderColor = type === Buttons.TYPE.Outline ? color : backgroundColor



    textType = textType || 'Text'
    textWeight = textWeight || 'bold'

    width = width || 'l'
    roundness = roundness || 's'

    // If solid, swap colors
    if (type === Buttons.TYPE.Solid) {
        const temp = color
        color = backgroundColor
        backgroundColor = temp
    }

    const StyledTouchable = styled(TouchableOpacity)`
        align-items: center;
        justify-content: center;

        background-color: ${backgroundColor};
        border-width: 2px;
        border-color: ${borderColor};
        ${Spacing.width(width)}
        ${Spacing.borderRadius(roundness)}
    `

    return (
        <StyledTouchable
            onPress={onPress}
            disabled={disabled}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            <View
                paddingVertical='m'
                paddingHorizontal='m'
            >
                {loading
                    ? <Loading4Dots
                        backgroundColor={backgroundColor}
                        dotColor={color}
                        height={Typography.lineHeight(textType, settings.textSize)}
                    />

                    : <Text
                        type={textType}
                        color={color}
                        weight={textWeight}
                    >
                        {text}
                    </Text>
                }
            </View>
        </StyledTouchable>
    )}

export default withPaddingAndMargins(Button)

