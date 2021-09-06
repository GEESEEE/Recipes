import { Animated } from 'react-native'

export const showPopup = (navigation: any, title: string, description?: string): void => {
    navigation.navigate('Popup', {
        title,
        description
    })
}

export const fade = ({
    current
}: any): any => ({
        cardStyle: {
            opacity: current.progress
        }
    })

export const slideHorizontal = ({
    current,
    next,
    inverted,
    layouts: { screen },
}: any): any => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
        next
            ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
              })
            : 0
    )

    return {
        cardStyle: {
            transform: [
                {
                    translateX: Animated.multiply(
                        progress.interpolate({
                            inputRange: [0, 1, 2],
                            outputRange: [
                                screen.width, // Focused, but offscreen in the beginning
                                0, // Fully focused
                                screen.width * -0.3, // Fully unfocused
                            ],
                            extrapolate: 'clamp',
                        }),
                        inverted
                    ),
                },
            ],
        },
    }
}

export const slideVertical = ({
    current,
    next,
    inverted,
    layouts: { screen },
}: any): any => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
        next
            ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
              })
            : 0
    )

    return {
        cardStyle: {
            transform: [
                {
                    translateY: Animated.multiply(
                        progress.interpolate({
                            inputRange: [0, 1, 2],
                            outputRange: [
                                -screen.height, // Focused, but offscreen in the beginning
                                0, // Fully focused
                                -screen.height * -0.3, // Fully unfocused
                            ],
                            extrapolate: 'clamp',
                        }),
                        inverted
                    ),
                },
            ],
        },
    }
}
