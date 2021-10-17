import React from 'react'
import styled from 'styled-components'
import { StyleProp, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, Text, Modal, Icons, TouchableOpacity } from '@/components/base'
import IconButton from './IconButton'
import { Spacing } from '@/styles'
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
    dependencies?: number[]
}

function DropdownMenu({
    items,
    iconOffset,
    iconSize,
    iconColor,
    dependencies,
}: DropdownMenuProps): JSX.Element {
    const { theme, textSize } = useAppSelector((state) => state.settings)
    const [open, toggle] = useToggle(false)
    const [positionRef, onPosition] = usePosition(dependencies)

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
        <View style={containerStyle} onLayout={onPosition}>
            <IconButton
                IconType={Icons.MyMaterialCommunityIcons}
                iconName="dots-vertical"
                onPress={() => toggle()}
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

const Menu = React.forwardRef(
    ({ items, offset, toggle }: MenuProps, ref: any): JSX.Element => {
        const { theme } = useAppSelector((state) => state.settings)
        const coords: Position = ref.current
        const insets = useSafeAreaInsets()

        const width = 100

        const menuStyle = {
            position: 'absolute',
            width,
            marginLeft: coords.pageX - width + offset,
            marginTop: coords.pageY + insets.top - offset,
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
