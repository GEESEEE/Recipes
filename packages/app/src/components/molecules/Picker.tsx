import React from 'react'
import styled from 'styled-components'
import { Dimensions, StyleProp, ViewStyle } from 'react-native'
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
} from '@/components/base'
import { useSettings, useToggle } from '@/hooks'
import { LayoutProps } from '@/components/higher-order'
import { DropdownItem, Position, TouchableEvent } from '@/types'

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
                <Modal animationType="none">
                    <Return onPress={() => toggle(false)} />
                    <ScrollView
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
                                            type={
                                                item.text === current
                                                    ? 'SubHeader'
                                                    : 'Text'
                                            }
                                            color={
                                                item.text === original
                                                    ? theme.primary
                                                    : theme.text
                                            }
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
                    </ScrollView>
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
