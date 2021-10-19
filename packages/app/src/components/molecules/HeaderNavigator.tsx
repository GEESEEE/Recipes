import React from 'react'
import styled from 'styled-components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, Text } from '@/components/base'
import { useAppSelector } from '@/hooks'

type HeaderNavigatorProps = {
    navigation: any
}

function HeaderNavigator({ navigation }: HeaderNavigatorProps): JSX.Element {
    const { theme, invertedColors } = useAppSelector((state) => state.settings)

    const insets = useSafeAreaInsets()

    const height = 35
    const sideOffset = 5

    const backgroundColor = invertedColors ? theme.primary : theme.background
    const color = invertedColors ? theme.background : theme.primary

    const containerStyle = {
        height: insets.top + height,
        backgroundColor,
        borderColor: theme.primary,
        borderBottomWidth: 1,
    }

    const safeContainerStyle = {
        paddingTop: insets.top,
        paddingLeft: insets.left + sideOffset,
        paddingRight: insets.right + sideOffset,
    }

    return (
        <Container style={containerStyle}>
            <SafeContainer style={safeContainerStyle}>
                <Text>Header</Text>
            </SafeContainer>
        </Container>
    )
}

export default HeaderNavigator

const Container = styled(View)``

const SafeContainer = styled(View)``
