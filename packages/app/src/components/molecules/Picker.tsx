import React from 'react'
import styled from 'styled-components'
import { Dimensions, StyleProp, ViewStyle } from 'react-native'
import { View, Text, TouchableOpacity, Modal } from '@/components/base'
import { Editable, TextInputWithTitle } from '@/components/atoms'
import { useSettings, useToggle } from '@/hooks'
import { LayoutProps } from '@/components/higher-order'
import { DropdownItem, Position, TouchableEvent } from '@/types'

type PickerProps = {
    items: DropdownItem[]
    current: string
} & LayoutProps

function Picker({ items, current, ...rest }: PickerProps): JSX.Element {
    const { theme } = useSettings()
    const [open, toggle] = useToggle(false)

    const [position, setPosition] = React.useState<Position>({
        pageX: 0,
        pageY: 0,
        locationX: 0,
        locationY: 0,
    })

    const pageX = position.pageX - position.locationX
    const pageY = position.pageY - position.locationY

    const menuStyle: StyleProp<ViewStyle> = {
        position: 'absolute',
        marginLeft: pageX,
        marginTop: pageY,
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
                <Modal animationType="none">
                    <Return onPress={() => toggle(false)} />
                    <View
                        borderRadius="s"
                        borderWidth="s"
                        borderColor={theme.primary}
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
                                            toggle(false)
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
        </Container>
    )
}

export default Picker

const Container = styled(View)``

const Return = styled(TouchableOpacity)`
    flex: 1;
`

const Separator = styled(View)`
    height: 1px;
    width: 100%;
`
