import React from 'react'
import styled from 'styled-components'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import DropdownMenu from '../DropdownMenu'
import { View, TouchableOpacity, Icon, Icons } from '@/components/base'
import { useSettings } from '@/hooks'
import { DropdownItem, GestureChangeEvent } from '@/types'

type ListItemProps = {
    items?: DropdownItem[]
    onPress?: () => void
    onGesture?: (e: GestureChangeEvent) => void
}

function ListItem({
    children,
    items,
    onPress,
    onGesture,
}: React.PropsWithChildren<ListItemProps>): JSX.Element {
    const { theme } = useSettings()
    return (
        <Container
            width="l"
            borderRadius="s"
            backgroundColor={theme.backgroundVariant}
            paddingVertical="s"
            paddingHorizontal="s"
            marginVertical="s"
        >
            {onGesture ? (
                <PanGestureHandler
                    maxPointers={1}
                    onGestureEvent={onGesture}
                    onHandlerStateChange={onGesture}
                >
                    <Animated.View>
                        <Icon
                            type={Icons.MyMaterialCommunityIcons}
                            name="drag-vertical"
                        />
                    </Animated.View>
                </PanGestureHandler>
            ) : null}
            <ItemContainer onPress={onPress} disabled={!onPress}>
                {children}
            </ItemContainer>
            {items ? <DropdownMenu items={items} /> : null}
        </Container>
    )
}

export default ListItem

const Container = styled(View)`
    flex-direction: row;
    align-items: center;
    align-content: space-between;
    align-self: center;
`

const ItemContainer = styled(TouchableOpacity)`
    flex: 1;
`
