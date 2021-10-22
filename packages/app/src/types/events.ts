export type Position = {
    pageX: number
    pageY: number
    locationX: number
    locationY: number
}

export type TouchableEvent = {
    nativeEvent: Position
}

export type GestureNativeEvent = {
    absoluteX: number
    absoluteY: number
    state: number
    translationX: number
    translationY: number
    velocityX: number
    velocityY: number
    x: number
    y: number
}

export type GestureChangeEvent = {
    nativeEvent: GestureNativeEvent
}

export type GestureStateEvent = {
    nativeEvent: GestureNativeEvent & { oldState: number }
}
