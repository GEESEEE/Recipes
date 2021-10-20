import React, { useEffect, useState } from 'react'
import { Animated, Dimensions, ViewStyle, StyleProp } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { useAppSelector } from '@/hooks'
import { Icon, Icons, View, Text, TouchableOpacity } from '@/components/base'

export type TabConfig = {
    [key: string]: {
        icon?: string
        name: string
    }
}

type TabComponentProps = {
    state: any
    navigation: any
    config: TabConfig
    position: 'top' | 'bottom'
}

const TabComponent = ({
    state,
    navigation,
    config,
    position,
}: TabComponentProps): JSX.Element => {
    const { routes } = state

    const totalWidth = Dimensions.get('window').width
    const tabWidth = totalWidth / routes.length
    const insets = useSafeAreaInsets()

    const { theme, invertedColors } = useAppSelector(
        (globalState) => globalState.settings
    )

    function navigate(routeName: string): void {
        navigation.navigate(routeName)
    }

    // #region Slider Stuff

    const [translateValue] = useState(new Animated.Value(0))

    const animateSlider = (index: number): any => {
        Animated.spring(translateValue, {
            toValue: index * tabWidth,
            velocity: 10,
            useNativeDriver: true,
        }).start()
    }

    useEffect(() => {
        animateSlider(state.index)
    }, [state.index])

    // #endregion

    // #region Styles and Colors

    const top = position === 'top'
    const hasIcons = Object.values(config).some(
        (obj) => typeof obj.icon !== 'undefined'
    )

    const paddingTop = top ? insets.top : 0
    const paddingBottom = top ? 0 : insets.bottom
    const height = hasIcons ? 50 : 30

    const backgroundColor = invertedColors ? theme.primary : theme.background
    const color = invertedColors ? theme.background : theme.primary

    const containerBorder = {
        borderTopColor: top ? undefined : theme.primary,
        borderBottomColor: top ? theme.primary : undefined,
    }

    const containerStyle: StyleProp<ViewStyle> = {
        paddingTop,
        height: height + paddingTop,
        backgroundColor,
        borderWidth: 1,
        ...containerBorder,
    }

    const safeContainerStyle: StyleProp<ViewStyle> = {
        paddingBottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
    }

    const sliderHeight = 5
    const sliderOffsetHorizontal = 10
    const sliderOffsetVertical = -(sliderHeight + 1) / 2

    const sliderPosition = {
        bottom: top ? sliderOffsetVertical : undefined,
        top: top ? undefined : sliderOffsetVertical,
    }

    const sliderStyle = [
        {
            transform: [{ translateX: translateValue }],
            width: tabWidth - 2 * sliderOffsetHorizontal,
            backgroundColor: color,
            borderColor: theme.primary,
            height: sliderHeight,
            left: sliderOffsetHorizontal,
            borderRadius: 10,
            borderWidth: 1,
            ...sliderPosition,
        },
    ]

    // #endregion

    return (
        <Container style={containerStyle}>
            <SafeContainer style={safeContainerStyle}>
                <TabSlider key={uuid()} style={sliderStyle} />

                {routes.map((route: any, index: any) => {
                    const { icon, name } = config[route.name]
                    const isFocused = state.index === index
                    return (
                        <RouteTab
                            key={uuid()}
                            icon={icon}
                            text={name}
                            onPress={() => navigate(route)}
                            isCurrent={isFocused}
                        />
                    )
                })}
            </SafeContainer>
        </Container>
    )
}

export default TabComponent

type TabProps = {
    icon?: string
    text: string
    onPress: () => void
    isCurrent?: boolean
}

const RouteTab = ({
    icon,
    text,
    onPress,
    isCurrent,
}: TabProps): JSX.Element => {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings

    let color = theme.primary
    if (settings.invertedColors) {
        if (isCurrent) {
            color = theme.background
        } else {
            color = theme.greyVariant
        }
    } else if (!isCurrent) {
        color = theme.grey
    }

    // const color = !isCurrent ? theme.grey : settings.invertedColors ? theme.background : theme.primary

    return (
        <TabContainer onPress={onPress}>
            {icon ? (
                <Icon
                    type={Icons.MyMaterialCommunityIcons}
                    name={icon}
                    color={color}
                />
            ) : null}
            <Text type="SubHeader" style={{ color }}>
                {text}
            </Text>
        </TabContainer>
    )
}

const Container = styled(View)`
    width: 100%;
    align-items: flex-start;
`

const SafeContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const TabSlider = styled(Animated.View)`
    position: absolute;
`

const TabContainer = styled(TouchableOpacity)`
    flex: 1;
    align-items: center;
    justify-content: center;
`
