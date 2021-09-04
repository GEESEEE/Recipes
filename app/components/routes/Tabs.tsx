import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    Animated,
    Dimensions,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { useAppSelector } from '../../hooks'
import { MyMaterialIcons } from '../Icons'

const routeIconMap = {
    Browse: 'book-search',
    Recipes: 'book-open-page-variant',
    Test: 'test-tube',
}

const BottomTab = ({ navigation }: { navigation: any }): JSX.Element => {
    const { state } = navigation
    const { routes } = state
    const totalWidth = Dimensions.get('window').width
    const tabWidth = totalWidth / routes.length
    const insets = useSafeAreaInsets()

    function navigate(routeName: string): void {
        navigation.navigate(routeName)
    }

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

    return (
        <Container style={{ height: insets.bottom + 50 }}>
            <SafeContainer
                style={{
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                }}
            >
                <TabSlider
                    key={uuid()}
                    style={[
                        {
                            transform: [{ translateX: translateValue }],
                            width: tabWidth - 20,
                        },
                    ]}
                />

                {routes.map((route: any, index: any) => {
                    const routeName: string = route.key
                    const isFocused = state.index === index
                    return (
                        <RouteTab
                            key={uuid()}
                            icon={(routeIconMap as any)[routeName]}
                            text={routeName}
                            onPress={() => navigate(routeName)}
                            isCurrent={isFocused}
                        />
                    )
                })}
            </SafeContainer>
        </Container>
    )
}

export default BottomTab

type TabProps = {
    icon: string
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
    const theme = useAppSelector((state) => state.theme)

    return (
        <TabContainer onPress={onPress}>
            <MyMaterialIcons
                name={icon}
                color={isCurrent ? theme.primary : theme.grey}
            />
            <TabText style={{ color: isCurrent ? theme.primary : theme.grey }}>
                {text}
            </TabText>
        </TabContainer>
    )
}

const Container = styled(View)`
    width: 100%;
    background-color: ${(props) => props.theme.background};
    align-items: flex-start;
`

const SafeContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const TabSlider = styled(Animated.View)`
    height: 4px;
    position: absolute;
    left: 10px;
    top: -2px;
    background-color: ${(props) => props.theme.primary};
    border-radius: 10px;
`

const TabContainer = styled(TouchableOpacity)`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
`

const TabText = styled(Text)`
    color: ${(props) => props.theme.primary}
    font-size: 16px;
    font-weight: bold;

`
