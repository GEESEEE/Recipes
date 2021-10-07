import React from 'react'
import TextInput from './TextInput'
import {
    withLayoutProps,
    LayoutProps,
    withTextProps,
    TextProps,
} from '@/components/higher-order'

type Props =  TextProps & LayoutProps

const Text = ({ ...rest }: Props): JSX.Element => (
    <TextInput
        editable={false}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
    />
)

export default withLayoutProps(withTextProps(Text))

