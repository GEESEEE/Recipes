import React from 'react'
import {Text, TextInput } from '@/components/base'
import { TextProps, withLayoutProps, LayoutProps, withTextProps } from '@/components/higher-order'

type EditableProps = {
    text: string
    numberOfLines?: number
    editable?: boolean
    handleTextChange?: (text: string, ...args: any[]) => void
} & TextProps & LayoutProps

function Editable({
    text,
    numberOfLines,
    editable,
    handleTextChange,
    style,
    ...rest
}: EditableProps ): JSX.Element {

    const textStyle = {
        flex: 1
    }
    if (editable) {
        return (
            <TextInput
                style={[
                    textStyle,
                    style
                ]}
                onChangeText={handleTextChange}
                value={text}
                multiline
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
            />
        )
    }

    return (
        <Text
            style={[
                textStyle,
                style
            ]}
            numberOfLines={numberOfLines}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            {text}
        </Text>
    )
}

export default withLayoutProps(withTextProps(Editable as any))
