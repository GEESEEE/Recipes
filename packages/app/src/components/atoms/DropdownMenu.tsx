import React from 'react'
import styled from 'styled-components'
import { Dimensions, StyleProp, ViewStyle } from 'react-native'
import IconButton from './IconButton'
import { View, Text, Modal, Icons, TouchableOpacity } from '@/components/base'
import { Spacing, Typography } from '@/styles'
import { useAppSelector, useToggle } from '@/hooks'
import { Position, TouchableEvent } from '@/types'

export type DropdownItem = {
    id: number
    text: string
    onPress: (e?: TouchableEvent) => void | Promise<void>
}

type DropdownMenuProps = {
    items: DropdownItem[]
    iconOffset?: Spacing.Size
    iconSize?: Spacing.Size
    iconColor?: string
}

function DropdownMenu({
    items,
    iconOffset,
    iconSize,
    iconColor,
}: DropdownMenuProps): JSX.Element {
    const { theme, textSize } = useAppSelector((state) => state.settings)
    const [open, toggle] = useToggle(false)

    const [pos, setPos] = React.useState<Position>({
        pageX: 0,
        pageY: 0,
        locationX: 0,
        locationY: 0,
    })

    function onPress(e: any): void {
        setPos(e.nativeEvent)
        toggle()
    }

    iconSize = iconSize || 'm'
    iconColor = iconColor || theme.primary

    let containerStyle: StyleProp<ViewStyle> = {}

    let offset = Spacing.iconSize(iconSize, textSize)
    if (typeof iconOffset !== 'undefined') {
        const totalOffset = Spacing.spacings[iconOffset]
        offset += totalOffset
        containerStyle = {
            ...containerStyle,
            alignSelf: 'flex-end',
            position: 'absolute',
            paddingTop: totalOffset,
            paddingEnd: totalOffset,
        }
    }

    return (
        <View style={containerStyle}>
            <IconButton
                type={Icons.MyMaterialCommunityIcons}
                name="dots-vertical"
                onPress={(e?: TouchableEvent) => onPress(e)}
                color={iconColor}
                size={iconSize}
            />
            {open ? (
                <Menu
                    position={pos}
                    items={items}
                    toggle={() => toggle()}
                    offset={offset}
                />
            ) : null}
        </View>
    )
}

export default DropdownMenu

type MenuProps = {
    items: DropdownItem[]
    position: Position
    offset: number
    toggle: () => void
}

const { height } = Dimensions.get('window')

const Menu = ({ items, position, offset, toggle }: MenuProps): JSX.Element => {
    const { theme, textSize } = useAppSelector((state) => state.settings)

    const width = 100
    const menuHeight =
        (16 + Typography.lineHeight('Text', textSize)) * items.length

    const pageX = position.pageX - position.locationX
    const pageY = position.pageY - position.locationY

    let marginTop = pageY + offset
    if (marginTop + menuHeight > height) {
        marginTop = height - menuHeight
    }

    const menuStyle: StyleProp<ViewStyle> = {
        position: 'absolute',
        width,
        marginLeft: pageX - width + offset,
        marginTop,
        borderWidth: 1,
        borderColor: theme.primary,
    }

    return (
        <Modal animationType="none">
            <Return onPress={() => toggle()} />

            <View
                borderRadius="s"
                backgroundColor={theme.backgroundVariant}
                style={menuStyle}
            >
                {items.map((item) => {
                    const separator = items.indexOf(item) !== items.length - 1
                    return (
                        <View key={item.id}>
                            <TouchableOpacity
                                onPress={() => {
                                    item.onPress()
                                    toggle()
                                }}
                            >
                                <Text paddingHorizontal="m" marginVertical="m">
                                    {item.text}
                                </Text>
                            </TouchableOpacity>
                            {separator ? (
                                <Separator backgroundColor={theme.text} />
                            ) : null}
                        </View>
                    )
                })}
            </View>
        </Modal>
    )
}

const Return = styled(TouchableOpacity)`
    flex: 1;
`

const Separator = styled(View)`
    height: 1px;
    width: 100%;
`
