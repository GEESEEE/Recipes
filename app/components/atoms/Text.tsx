import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import styled from 'styled-components'
import { useAppSelector } from '@/hooks'
import { Typography} from '@/styles'
import { withLayoutProps, LayoutProps, withTextProps, TextProps } from '@/components/higher-order'

type Props = {
    children?: React.ReactNode | Element[]
}
& TextProps
& LayoutProps
& RNTextProps

const Text = ({
    children,
    ...rest
}: Props): JSX.Element => (
        <RNText
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            {children}
        </RNText>
    )

export default withLayoutProps(withTextProps(Text))
