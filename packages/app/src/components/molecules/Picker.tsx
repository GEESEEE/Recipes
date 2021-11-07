import React from 'react'
import styled from 'styled-components'
import { Dimensions, StyleProp, ViewStyle } from 'react-native'
import { View, Text, TouchableOpacity } from '@/components/base'
import { Menu } from '@/components/atoms'
import { useSettings, useToggle, usePosition } from '@/hooks'
import { LayoutProps } from '@/components/higher-order'
import { DropdownItem, TouchableEvent } from '@/types'

type PickerProps = {
    items: DropdownItem[]
    current: string
    original: string
} & LayoutProps

const { height } = Dimensions.get('window')

function Picker({
    items,
    current,
    original,
    ...rest
}: PickerProps): JSX.Element {
    const { theme } = useSettings()
    const [open, toggle] = useToggle(false)

    const [pageX, pageY, setPosition] = usePosition()

    const menuStyle: StyleProp<ViewStyle> = {
        position: 'absolute',
        marginLeft: pageX,
        marginTop: pageY,
        maxHeight: height - pageY,
    }

    return (
        <Container {...rest}>
            <TouchableOpacity
                onPress={(e: TouchableEvent) => {
                    setPosition(e.nativeEvent)
                    toggle(true)
                }}
            >
                <Text
                    borderRadius="s"
                    backgroundColor={theme.backgroundVariant}
                    paddingVertical="s"
                    paddingHorizontal="s"
                >
                    {current}
                </Text>
            </TouchableOpacity>
            {open ? (
                <Menu
                    toggle={toggle}
                    items={items}
                    style={menuStyle}
                    current={current}
                    original={original}
                />
            ) : null}
        </Container>
    )
}

export default Picker

const Container = styled(View)``
