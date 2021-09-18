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
import { MyMaterialCommunityIcons } from '../Icons'

const Config: { [key: string]: any} = {
    BrowseStack: {
        icon: 'book-search',
        name: 'Browse',
    },
    RecipesStack: {
        icon: 'book-open-page-variant',
        name: 'My Recipes',
    },
    Test: {
        icon: 'test-tube',
        name: 'Test',
    }
}


const TabsComponent = ({ state, navigation }: any): JSX.Element => {
    const {routes} = state

    const totalWidth = Dimensions.get('window').width
    const tabWidth = totalWidth / routes.length
    const insets = useSafeAreaInsets()

    const { theme, settings } = useAppSelector((globalState) => globalState)

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
        <Container
            style={{
                height: insets.bottom + 50,
                backgroundColor: settings.invertedColors
                    ? theme.primary
                    : theme.background,
            }}
        >
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
                            backgroundColor: settings.invertedColors
                                ? theme.background
                                : theme.primary,
                            borderColor: settings.invertedColors
                                ? theme.primary
                                : theme.primary,
                        },
                    ]}
                />

                {routes.map((route: any, index: any) => {
                    const {icon, name} = Config[route.name]
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

export default TabsComponent

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
    const { theme, settings } = useAppSelector((state) => state)

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
            <MyMaterialCommunityIcons name={icon} color={color} />
            <TabText style={{ color }}>{text}</TabText>
        </TabContainer>
    )
}

const Container = styled(View)`
    width: 100%;
    align-items: flex-start;
    border-top-width: 1px;
    border-top-color: ${(props) => props.theme.primary};
`

const SafeContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const TabSlider = styled(Animated.View)`
    height: 5px;
    position: absolute;
    left: 10px;
    top: -3px;
    border-radius: 10px;
    border-width: 1px;
`

const TabContainer = styled(TouchableOpacity)`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
`

const TabText = styled(Text)`
    font-size: 16px;
    font-weight: bold;
`
