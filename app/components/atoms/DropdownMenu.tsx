import React from 'react'
import styled from 'styled-components'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, Text, Modal, Icons } from '@/components/base'
import IconButton from './IconButton'
import { Spacing } from '@/styles'
import { Position, useAppSelector, usePosition, useToggle } from '@/hooks'
import { utils } from '@/config'

export type DropdownItem = {
    id: number
    text: string
    onPress: () => void | Promise<void>
}

function createDropDownItems(
    onPresses: Array<() => Promise<void> | void>,
    name: string
): DropdownItem[] {
    return onPresses.map((onPress) => {
        // Slice recipe off the function name
        const text = utils.capitalizeFirstLetter(
            onPress.name.slice(0, onPress.name.length - name.length)
        )
        return {
            id: onPresses.indexOf(onPress),
            text,
            onPress,
        }
    })
}

type DropdownMenuProps = {
    functions: Array<() => Promise<void> | void>
    functionSuffix: string
    iconOffset?: Spacing.Size
    iconSize?: Spacing.Size
    iconColor?: string
    dependencies?: number[]
}

function DropdownMenu({
    functions,
    functionSuffix: name,
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

    const dropdownItems = createDropDownItems(functions, name)

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
                    items={dropdownItems}
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
                                        type="SubHeader"
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
