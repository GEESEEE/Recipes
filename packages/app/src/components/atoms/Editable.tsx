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
    handleTextChange?: (text: string, ...args: any[]) => void
} & TextProps &
    LayoutProps

function Editable({
    text,
    numberOfLines,
    editable,
    handleTextChange,
    ...rest
}: EditableProps): JSX.Element {
    if (editable) {
        return (
            <TextInput
                onChangeText={handleTextChange}
                value={text}
                multiline
                {...rest}
            />
        )
    }

    return (
        <Text numberOfLines={numberOfLines} {...rest}>
            {text}
        </Text>
    )
}

export default withLayoutProps(withTextProps(Editable))
