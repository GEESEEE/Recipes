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
import { Spacing } from '@/styles'

type TextInputProps = {
    paddingHorizontal?: Spacing.Size
} & RNTextInputProps &
    TextProps &
    LayoutProps

const TextInput = ({
    paddingHorizontal,
    style,
    ...rest
}: TextInputProps): JSX.Element => {
    const { theme } = useAppSelector((state) => state.settings)
    paddingHorizontal = paddingHorizontal || 's'
    const ph = paddingHorizontal ? Spacing.spacings[paddingHorizontal] : 0
    return (
        <RNTextInput
            style={[
                {
                    paddingHorizontal: ph,
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
