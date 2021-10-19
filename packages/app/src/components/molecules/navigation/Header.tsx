import React from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import { View, Text, Icons } from '@/components/base'
import { Button, IconButton } from '@/components/atoms'
import { useAppSelector } from '@/hooks'

type HeaderIcon = {
    type: any
    name: string
    onPress: () => void
}

export type HeaderConfig = {
    right: Array<HeaderIcon>
}

type HeaderComponentProps = {
    navigation: any
    config: HeaderConfig
}

function HeaderComponent({
    navigation,
    config,
}: HeaderComponentProps): JSX.Element {
    const { theme, invertedColors } = useAppSelector((state) => state.settings)
    const route = useRoute()
    const routeName = route.name

    const insets = useSafeAreaInsets()

    const height = 35

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
        paddingLeft: insets.left,
        paddingRight: insets.right,
    }

    return (
        <Container style={containerStyle}>
            <SafeContainer style={safeContainerStyle}>
                <HeaderIcon
                    IconType={Icons.MyFeather}
                    iconName="menu"
                    onPress={() => navigation.toggleDrawer()}
                    color={color}
                />
                <HeaderCenter>
                    <Text type="SubHeader" color={color} paddingHorizontal="m">
                        {routeName}
                    </Text>
                </HeaderCenter>
                {config.right.map((icon) => {
                    return (
                        <HeaderIcon
                            key={uuid()}
                            IconType={icon.type}
                            iconName={icon.name}
                            onPress={icon.onPress}
                            color={color}
                        />
                    )
                })}
            </SafeContainer>
        </Container>
    )
}

export default HeaderComponent

const Container = styled(View)``

const SafeContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const HeaderCenter = styled(View)`
    flex: 1;
`

type HeaderIconProps = {
    IconType: any
    iconName: string
    onPress: () => void
    color: string
}

function HeaderIcon({
    IconType,
    iconName,
    onPress,
    color,
}: HeaderIconProps): JSX.Element {
    return (
        <IconButton
            IconType={IconType}
            iconName={iconName}
            onPress={onPress}
            color={color}
            size="l"
            paddingHorizontal="s"
        />
    )
}
