import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { withPaddingAndMargins, PaddingAndMarginProps } from '@/components/higher-order'
import { useAppSelector } from '@/hooks'

type IconButtonProps = {
    onPress: () => void
    IconType: any
    iconName: string
}
& PaddingAndMarginProps
& TouchableOpacityProps

function IconButton({
    onPress,
    disabled,

    IconType,
    iconName,

    ...rest
}: IconButtonProps): JSX.Element {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings

    const StyledTouchable = styled(TouchableOpacity)`

    `

    const StyledIcon = styled(IconType)`

    `

    return (
        <StyledTouchable
            onPress={onPress}
            disabled={disabled}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            <StyledIcon
                name={iconName}
                color={theme.primary}
                size={20}
            />
        </StyledTouchable>
    )
}

export default withPaddingAndMargins(IconButton)
