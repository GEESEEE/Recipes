import React from 'react'
import styled from 'styled-components'
import { StyleProp, ViewStyle } from 'react-native'
import { useSettings } from '@/hooks'
import {
    Modal,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
} from '@/components/base'
import { DropdownItem } from '@/types'

type MenuProps = {
    toggle: (bool: boolean) => void
    style: StyleProp<ViewStyle>
    items: DropdownItem[]
    current?: string
    original?: string
}

function Menu({
    toggle,
    style,
    items,
    current,
    original,
}: MenuProps): JSX.Element {
    const { theme } = useSettings()

    return (
        <Modal animationType="none">
            <Return onPress={() => toggle(false)} />
            <ScrollView
                borderRadius="s"
                borderWidth="s"
                borderColor={theme.primary}
                backgroundColor={theme.backgroundVariant}
                style={style}
            >
                {items.map((item) => {
                    const separator = items.indexOf(item) !== items.length - 1
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
                                            ? 'Header'
                                            : 'SubHeader'
                                    }
                                    weight="semiBold"
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
                                <Separator backgroundColor={theme.text} />
                            ) : null}
                        </View>
                    )
                })}
            </ScrollView>
        </Modal>
    )
}

export default Menu

const Return = styled(TouchableOpacity)`
    flex: 1;
`

const Separator = styled(View)`
    height: 1px;
    width: 100%;
`
