import React from 'react'
import styled from 'styled-components'
import { LayoutProps } from '@/components/higher-order'
import { View, Icons } from '@/components/base'
import { IconButton, Editable } from '@/components/atoms'
import { useSettings, useToggle } from '@/hooks'
import { Spacing } from '@/styles'

type CounterProps = {
    increment: () => void
    decrement: () => void
    value: number | string
    onChange?: (text: string) => void
    iconType?: any
    iconName?: string
    size?: Spacing.Size
} & LayoutProps

function Counter({
    increment,
    decrement,
    value,
    iconType,
    iconName,
    onChange,
    size = 'l',
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
                size={size}
            />
            {displayIcon ? (
                <IconButton
                    type={iconType}
                    name={iconName}
                    onPress={() => toggleEditable()}
                    size={size}
                />
            ) : null}
            <Editable
                editable={editable}
                paddingHorizontal={displayIcon ? 's' : 'm'}
                type={displayIcon ? 'SubHeader' : 'Text'}
                text={value.toString()}
                handleTextChange={onChange}
            />

            <IconButton
                type={Icons.MyFeather}
                name="plus"
                onPress={increment}
                color={theme.primary}
                size={size}
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
