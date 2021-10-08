import React from 'react'
import styled from 'styled-components'
import {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
} from 'react-native'
import {
    withLayoutProps,
    LayoutProps,
    withTextProps,
    TextProps,
} from '@/components/higher-order'
import { useAppSelector } from '@/hooks'
import { Spacing, Typography } from '@/styles'

type TextInputProps = {
    paddingHorizontal?: Spacing.Size
} & RNTextInputProps &
    TextProps &
    LayoutProps

const TextInput = ({
    paddingHorizontal,
    type,
    style,
    ...rest
}: TextInputProps): JSX.Element => {
    const { theme, textSize } = useAppSelector((state) => state.settings)
    console.log("TI", type)
    paddingHorizontal = paddingHorizontal || 's'
    type = type || 'Text'
    const lineHeight = Typography.lineHeight(type, textSize)
    return (
        <RNTextInput
            style={[
                {
                    height: lineHeight,
                    paddingHorizontal: Spacing.spacings[paddingHorizontal],
                },
                style,

            ]}
            placeholderTextColor={theme.grey}
            autoCapitalize="none"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    )
}

export default withLayoutProps(withTextProps(TextInput))
