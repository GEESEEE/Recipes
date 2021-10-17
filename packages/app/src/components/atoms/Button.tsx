import React from 'react'
import styled from 'styled-components'
import {
    Text,
    View,
    TouchableOpacity,
    TouchableOpacityProps,
} from '@/components/base'
import Loading4Dots from './Loading4Dots'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'
import { Typography, Spacing } from '@/styles'
import { useAppSelector } from '@/hooks'

type ButtonType = 'Solid' | 'Outline' | 'Clear'
const TYPE = {
    Solid: 'Solid',
    Outline: 'Outline',
    Clear: 'Clear',
}

type ButtonProps = {
    type: ButtonType
    text: string
    onPress: () => void

    color?: string
    backgroundColor?: string

    textType?: Typography.TextType
    textWeight?: Typography.TextWeight
    textTransform?: Typography.TextTransform

    loading?: boolean
} & LayoutProps &
    TouchableOpacityProps

const Button = ({
    type,
    color,
    backgroundColor,

    text,
    textType,
    textWeight,
    textTransform,

    borderRadius,
    width,

    loading,
    onPress,
    disabled,
    style,
    ...rest
}: ButtonProps): JSX.Element => {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings

    color = color || theme.primary
    if (disabled) {
        color = theme.grey
    }
    backgroundColor = backgroundColor || theme.background
    const borderColor = type === TYPE.Clear ? backgroundColor : color

    textType = textType || 'Text'
    textWeight = textWeight || 'bold'
    textTransform = textTransform || 'uppercase'

    if (type === TYPE.Clear) {
        textWeight = 'normal'
        textTransform = 'lowercase'
    }
    borderRadius = borderRadius || 's'
    width = width || 'm'

    // If solid, swap colors
    if (type === TYPE.Solid) {
        const temp = color
        color = backgroundColor
        backgroundColor = temp
    }

    const buttonStyle = {
        backgroundColor,
        borderColor,
        borderRadius: Spacing.borderRadii[borderRadius],
        width: Spacing.widths[width],
    }

    return (
        <StyledTouchable
            onPress={onPress}
            disabled={disabled}
            style={[buttonStyle, style]}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            <View paddingVertical="s">
                {loading ? (
                    <Loading4Dots
                        backgroundColor={backgroundColor}
                        dotColor={color}
                        height={Typography.lineHeight(
                            textType,
                            settings.textSize
                        )}
                    />
                ) : (
                    <Text
                        type={textType}
                        color={color}
                        weight={textWeight}
                        transform={textTransform}
                    >
                        {text}
                    </Text>
                )}
            </View>
        </StyledTouchable>
    )
}

export default withLayoutProps(Button as any)

const StyledTouchable = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    border-width: 2px;
`
