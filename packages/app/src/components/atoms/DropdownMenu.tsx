import React from 'react'
import styled from 'styled-components'
import { Dimensions, StyleProp, ViewStyle } from 'react-native'
import IconButton from './IconButton'
import { View, Text, Modal, Icons, TouchableOpacity } from '@/components/base'
import { Spacing, Typography } from '@/styles'
import { useAppSelector, useSettings, useToggle } from '@/hooks'
import { Position, TouchableEvent } from '@/types'

export type DropdownItem = {
    id: number
    text: string
    onPress: (e?: TouchableEvent) => void | Promise<void>
}

const { height } = Dimensions.get('window')

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
    const { theme, textSize } = useSettings()
    const [open, toggle] = useToggle(false)

    const [position, setPosition] = React.useState<Position>({
        pageX: 0,
        pageY: 0,
        locationX: 0,
        locationY: 0,
    })

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

    const width = 100
    const menuHeight =
        (16 + Typography.lineHeight('Text', textSize)) * items.length

    function onOpen(e: any): void {
        setPosition(e.nativeEvent)
        toggle(true)
    }

    function onClose(): void {
        toggle(false)
    }

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
        <View style={containerStyle}>
            <IconButton
                type={Icons.MyMaterialCommunityIcons}
                name="dots-vertical"
                onPress={(e?: TouchableEvent) => onOpen(e)}
                color={iconColor}
                size={iconSize}
            />
            {open ? (
                <Modal animationType="none">
                    <Return onPress={() => onClose()} />

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
                                            onClose()
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
                                        <Separator
                                            backgroundColor={theme.text}
                                        />
                                    ) : null}
                                </View>
                            )
                        })}
                    </View>
                </Modal>
            ) : null}
        </View>
    )
}

export default DropdownMenu

const Return = styled(TouchableOpacity)`
    flex: 1;
`

const Separator = styled(View)`
    height: 1px;
    width: 100%;
`
