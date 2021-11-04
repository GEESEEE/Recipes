import React from 'react'
import styled from 'styled-components'
import { LayoutProps } from '@/components/higher-order'
import { View, Icons } from '@/components/base'
import { IconButton, Editable } from '@/components/atoms'
import { useSettings, useToggle } from '@/hooks'

type CounterProps = {
    increment: () => void
    decrement: () => void
    value: number | string
    onChange?: (text: string) => void
    iconType?: any
    iconName?: string
    icon?: JSX.Element
} & LayoutProps

function Counter({
    increment,
    decrement,
    value,
    iconType,
    iconName,
    onChange,
    ...rest
}: CounterProps): JSX.Element {
    const { theme } = useSettings()

    const [editable, toggleEditable] = useToggle(false)

    const displayIcon = iconName && iconType && onChange

    return (
        <Container
            borderRadius="s"
            backgroundColor={theme.backgroundVariant}
            paddingHorizontal="s"
            {...rest}
        >
            <IconButton
                type={Icons.MyFeather}
                name="minus"
                onPress={decrement}
                color={theme.primary}
            />
            {displayIcon ? (
                <IconButton
                    type={iconType}
                    name={iconName}
                    onPress={() => toggleEditable()}
                />
            ) : null}
            <Editable
                editable={editable}
                paddingHorizontal={displayIcon ? 's' : 'm'}
                paddingVertical="s"
                type={displayIcon ? 'SubHeader' : 'Text'}
                text={value.toString()}
                handleTextChange={onChange}
            />

            <IconButton
                type={Icons.MyFeather}
                name="plus"
                onPress={increment}
                color={theme.primary}
            />
        </Container>
    )
}

export default Counter

const Container = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
