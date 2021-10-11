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


type TextInputProps = RNTextInputProps &
    TextProps &
    LayoutProps

const TextInput = ({
    ...rest
}: TextInputProps): JSX.Element => {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <RNTextInput
            placeholderTextColor={theme.grey}
            autoCapitalize="none"
            autoCorrect={false}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    )
}

export default withLayoutProps(withTextProps(TextInput))
