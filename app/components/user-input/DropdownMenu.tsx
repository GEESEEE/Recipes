import React from 'react'
import { View, TouchableOpacity, Text, Modal } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { Position, usePosition, useToggle } from '@/hooks'
import { ButtonOptions } from './Buttons'

export type DropDownItem = {
    id: number
    text: string
    onPress: () => void | Promise<void>
}

export function DropDownMenu({
    items,
    iconSize = 25,
    iconOffset = 5,
    dependencies,
}: {
    items: DropDownItem[]
    iconSize?: number
    iconOffset?: number
    dependencies?: number[]
}): JSX.Element {
    const [open, toggle] = useToggle(false)
    const offset = iconSize + iconOffset * 2
    const [positionRef, onPosition] = usePosition(dependencies)

    const Container = styled(View)`
        position: absolute;
        padding-top: ${iconOffset}px;
        padding-end: ${iconOffset}px;
        align-self: flex-end;
        width: 101px;
        height: ${items.length * 30 + 2}px;
    `

    return (
        <Container onLayout={onPosition}>
            <ButtonOptions
                onPress={() => toggle()}
                size={iconSize}
                offset={iconOffset}
            />
            {open ? (
                <Menu
                    ref={positionRef}
                    items={items}
                    toggle={() => toggle()}
                    offset={offset}
                    onPress={() => toggle()}
                />
            ) : null}
        </Container>
    )
}

const Menu = React.forwardRef(
    (
        {
            items,
            offset,
            onPress,
            toggle,
        }: {
            items: DropDownItem[]
            offset: number
            onPress: () => void
            toggle: () => void
        },
        ref: any
    ): JSX.Element => {
        const coords: Position = ref.current
        const insets = useSafeAreaInsets()
        const PopupMenu = styled(View)`
            position: absolute;
            width: ${coords.width}px;
            margin-left: ${coords.pageX}px;
            margin-top: ${coords.pageY - insets.top + offset}px;
            border-radius: 10px;
            background-color: ${(props) => props.theme.backgroundVariant};
        `

        return (
            <Modal transparent>
                <PopupReturn onPress={onPress} />
                <PopupMenu>
                    {items.map((item) => {
                        const separator =
                            items.indexOf(item) !== items.length - 1
                        return (
                            <View key={item.id}>
                                <ItemView
                                    onPress={() => {
                                        item.onPress()
                                        toggle()
                                    }}
                                >
                                    <ItemText>{item.text}</ItemText>
                                </ItemView>
                                {separator ? <Separator /> : null}
                            </View>
                        )
                    })}
                </PopupMenu>
            </Modal>
        )
    }
)

const PopupReturn = styled(TouchableOpacity)`
    flex: 1;
`

const ItemView = styled(TouchableOpacity)`
    justify-content: center;
    height: 25px;
`

const ItemText = styled(Text)`
    font-size: 15px;
    padding: 5px;
    padding: 10px;
    color: ${(props) => props.theme.text};
`

const Separator = styled(View)`
    height: 1px;
    width: 100%;
    background-color: ${(props) => props.theme.grey};
`
