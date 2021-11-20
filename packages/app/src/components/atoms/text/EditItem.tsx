import React from 'react'
import styled from 'styled-components'
import { View, Text } from '@/components/base'
import { LayoutProps } from '@/components/higher-order'

type EditItemProps = {
    text: string
    element: JSX.Element
    element2?: JSX.Element | null
} & LayoutProps

function EditItem({
    text,
    element,
    element2,
    ...rest
}: EditItemProps): JSX.Element {
    return (
        <RowContainer
            width="l"
            paddingHorizontal="m"
            marginVertical="s"
            {...rest}
        >
            <FlexText>{text}</FlexText>
            <ElementContainer width="m">
                <FlexView>{element}</FlexView>
                <View paddingHorizontal="s" />
                {typeof element2 === 'undefined' ? null : element2 === null ? (
                    <FlexView />
                ) : (
                    <FlexView>{element2}</FlexView>
                )}
            </ElementContainer>
        </RowContainer>
    )
}

export default EditItem

const RowContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`

const FlexText = styled(Text)`
    flex: 1;
`

const ElementContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`

const FlexView = styled(View)`
    flex: 1;
    align-items: center;
`
