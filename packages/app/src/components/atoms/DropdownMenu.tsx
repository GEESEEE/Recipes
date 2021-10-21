import React from 'react'
import styled from 'styled-components'
import {
    Dimensions,
    LayoutChangeEvent,
    StyleProp,
    ViewStyle,
} from 'react-native'
import { v4 as uuid } from 'uuid'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import IconButton from './IconButton'
import { View, Text, Modal, Icons, TouchableOpacity } from '@/components/base'
import { Spacing, Typography } from '@/styles'
import { Position, useAppSelector, usePosition, useToggle } from '@/hooks'

export type DropdownItem = {
    id: number
    text: string
    onPress: () => void | Promise<void>
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
    const [positionRef, onPosition] = usePosition()

    const [viewKey, setViewKey] = React.useState(uuid())

    function onClick(): void {
        setViewKey(uuid())
        setTimeout(() => {
            toggle()
        }, 40)
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
        <View
            style={containerStyle}
            key={viewKey}
            onLayout={(e: LayoutChangeEvent) => {
                onPosition(e)
            }}
        >
            <IconButton
                type={Icons.MyMaterialCommunityIcons}
                name="dots-vertical"
                onPress={() => onClick()}
                color={iconColor}
                size={iconSize}
            />
            {open ? (
                <Menu
                    ref={positionRef}
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
    offset: number
    toggle: () => void
}

const { height } = Dimensions.get('window')

const Menu = React.forwardRef(
    ({ items, offset, toggle }: MenuProps, ref: any): JSX.Element => {
        const { theme, textSize } = useAppSelector((state) => state.settings)
        const coords: Position = ref.current

        const width = 100

        const menuHeight =
            (16 + Typography.lineHeight('Text', textSize)) * items.length

        let marginTop = coords.pageY + offset
        if (marginTop + menuHeight > height) {
            marginTop = height - menuHeight
        }

        const menuStyle: StyleProp<ViewStyle> = {
            position: 'absolute',
            width,
            marginLeft: coords.pageX - width + offset,
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
                        const separator =
                            items.indexOf(item) !== items.length - 1
                        return (
                            <View key={item.id}>
                                <TouchableOpacity
                                    onPress={() => {
                                        item.onPress()
                                        toggle()
                                    }}
                                >
                                    <Text
                                        paddingHorizontal="m"
                                        marginVertical="m"
                                    >
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
)

const Return = styled(TouchableOpacity)`
    flex: 1;
`

const Separator = styled(View)`
    height: 1px;
    width: 100%;
`
