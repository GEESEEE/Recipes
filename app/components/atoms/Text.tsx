import React from 'react'
import { Text as RNText } from 'react-native'
import {
    withLayoutProps,
    LayoutProps,
    withTextProps,
    TextProps,
} from '@/components/higher-order'
import { useAppSelector } from '@/hooks'
import { Typography } from '@/styles'

type Props = TextProps & LayoutProps

const Text = ({type, style, ...rest }: Props): JSX.Element => {
    const { textSize } = useAppSelector((state) => state.settings)
    type = type || 'Text'
    const lineHeight = Typography.lineHeight(type, textSize)

    return (
    <RNText
        style={[
            {
                height: lineHeight,
            },
            style,
        ]}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
    />
)}

export default withLayoutProps(withTextProps(Text))
