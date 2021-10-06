import React from 'react'
import styled from 'styled-components'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import {
    TextProps,
    withTextProps,
    LayoutProps,
    withLayoutProps,
} from '@/components/higher-order'
import { useAppSelector } from '@/hooks'
import { Typography } from '@/styles'

type Props = React.PropsWithChildren<
    {
        type?: Typography.TextType
    } & RNTextProps
>

function Text({ children, ...rest }: Props): JSX.Element {
    const { theme, textSize } = useAppSelector((state) => state.settings)

    return (
        <RNText
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            {children}
        </RNText>
    )
}

export default Text
