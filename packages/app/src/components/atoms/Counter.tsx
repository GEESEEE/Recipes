import React from 'react'
import styled from 'styled-components'
import IconButton from './IconButton'
import { LayoutProps } from '@/components/higher-order'
import { View, Icons, Text } from '@/components/base'
import { useSettings } from '@/hooks'

type CounterProps = {
    increment: () => void
    decrement: () => void
    value: number | string
    icon?: JSX.Element
} & LayoutProps

function Counter({
    increment,
    decrement,
    value,
    icon,
    ...rest
}: CounterProps): JSX.Element {
    const { theme } = useSettings()

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
            {icon}
            <Text
                paddingHorizontal={icon ? 's' : 'm'}
                paddingVertical="s"
                type={icon ? 'SubHeader' : 'Text'}
            >
                {value}
            </Text>
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
