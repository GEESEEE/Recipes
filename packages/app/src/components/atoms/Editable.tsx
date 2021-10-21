import React from 'react'
import { Text, TextInput } from '@/components/base'
import {
    TextProps,
    withLayoutProps,
    LayoutProps,
    withTextProps,
} from '@/components/higher-order'

type EditableProps = {
    text: string
    numberOfLines?: number
    editable?: boolean
    placeholder?: string
    handleTextChange?: (text: string, ...args: any[]) => void
} & TextProps &
    LayoutProps

function Editable({
    text,
    numberOfLines,
    editable,
    placeholder,
    handleTextChange,
    ...rest
}: EditableProps): JSX.Element {
    if (editable) {
        return (
            <TextInput
                onChangeText={handleTextChange}
                value={text}
                placeholder={placeholder}
                multiline
                {...rest}
            />
        )
    }

    let fixHeight = false
    if (numberOfLines) {
        fixHeight = true
    }

    return (
        <Text numberOfLines={numberOfLines} fixHeight={fixHeight} {...rest}>
            {text}
        </Text>
    )
}

export default withLayoutProps(withTextProps(Editable))
