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

type TextInputProps =
    RNTextInputProps
    & TextProps
    & LayoutProps

const TextInput = ({
    ...rest
}: TextInputProps): JSX.Element => {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings

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

type Attrs = {
    paddingHorizontal?: Spacing.Size
}

const StyledTextInput = styled(RNTextInput).attrs(({paddingHorizontal}: Attrs) => ({
    paddingHorizontal: Spacing.spacings[paddingHorizontal || 's']
}))`

`
