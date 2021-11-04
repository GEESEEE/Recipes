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
    releaseHeight?: boolean
    placeholder?: string
    handleTextChange?: (text: string, ...args: any[]) => void
} & TextProps &
    LayoutProps

function Editable({
    text,
    numberOfLines,
    editable,
    releaseHeight,
    placeholder,
    handleTextChange,
    ...rest
}: EditableProps): JSX.Element {
    if (editable || releaseHeight) {
        return (
            <TextInput
                onChangeText={handleTextChange}
                value={text}
                placeholder={placeholder}
                editable={!releaseHeight}
                multiline
                {...rest}
            />
        )
    }

    return (
        <Text
            numberOfLines={numberOfLines}
            fixHeight={!!numberOfLines && !releaseHeight}
            {...rest}
        >
            {text}
        </Text>
    )
}

export default withLayoutProps(withTextProps(Editable))
