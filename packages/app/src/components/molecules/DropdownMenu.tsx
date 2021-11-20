import React from 'react'

import { Dimensions, StyleProp, ViewStyle } from 'react-native'
import { View, Icons } from '@/components/base'
import { IconButton, Menu } from '@/components/atoms'
import { Spacing, Typography } from '@/styles'
import { usePosition, useSettings, useToggle } from '@/hooks'
import { DropdownItem, TouchableEvent } from '@/types'

const { height } = Dimensions.get('window')

type DropdownMenuProps = {
    items: DropdownItem[]
    iconOffset?: Spacing.Size
    iconSize?: Spacing.Size
    color?: string
}

function DropdownMenu({
    items,
    iconOffset,
    iconSize,
    color,
}: DropdownMenuProps): JSX.Element {
    const { theme, textSize } = useSettings()
    const [open, toggle] = useToggle(false)

    const [pageX, pageY, setPosition] = usePosition()

    iconSize = iconSize || 'm'
    color = color || theme.primary

    let containerStyle: StyleProp<ViewStyle> = {}

    let offset = Spacing.iconSize(iconSize, textSize)
    if (typeof iconOffset !== 'undefined') {
        const totalOffset = Spacing.spacings[iconOffset]
        offset += totalOffset
        containerStyle = {
            alignSelf: 'flex-end',
            position: 'absolute',
            paddingTop: totalOffset,
            paddingEnd: totalOffset,
        }
    }

    const width = 100
    const menuHeight =
        (16 + Typography.lineHeight('Text', textSize)) * items.length

    let marginTop = pageY + offset
    if (marginTop + menuHeight > height) {
        marginTop = height - menuHeight
    }

    const menuStyle: StyleProp<ViewStyle> = {
        position: 'absolute',
        width,
        marginLeft: pageX - width + offset,
        marginTop,
    }

    return (
        <View style={containerStyle}>
            {items.length > 0 ? (
                <IconButton
                    type={Icons.MyMaterialCommunityIcons}
                    name="dots-vertical"
                    onPress={(e: TouchableEvent) => {
                        setPosition(e.nativeEvent)
                        toggle(true)
                    }}
                    color={color}
                    size={iconSize}
                />
            ) : null}
            {open ? (
                <Menu toggle={toggle} items={items} style={menuStyle} />
            ) : null}
        </View>
    )
}

export default DropdownMenu
