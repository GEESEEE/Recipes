import React from 'react'
import styled from 'styled-components'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import {
    withLayoutProps,
    LayoutProps,
    withTextProps,
    TextProps,
} from '@/components/higher-order'

type Props = TextProps & LayoutProps & RNTextProps

const Text = ({ children, ...rest }: Props): JSX.Element => (
    <StyledText
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
    >
        {children}
    </StyledText>
)

export default withTextProps(Text)

const StyledText = styled(RNText)``
