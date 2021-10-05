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

type TextInputProps = LayoutProps &
    TextProps &
    RNTextInputProps

const TextInput = ({
    paddingHorizontal,
    ...rest
}: TextInputProps): JSX.Element => {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings

    paddingHorizontal = paddingHorizontal || 'm'

    const StyledTextInput = styled(RNTextInput)`
        ${Spacing.paddingHorizontal(paddingHorizontal)}
    `

    return (
        <StyledTextInput
            placeholderTextColor={theme.grey}
            autoCapitalize="none"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    )
}

export default withLayoutProps(withTextProps(TextInput))
