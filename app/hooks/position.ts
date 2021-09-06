import React, { MutableRefObject } from 'react'
import { LayoutChangeEvent } from 'react-native'

export type Position = {
    width: number
    height: number
    pageX: number
    pageY: number
}

const usePosition = (
    callbackDependencies?: any[]
): [
    positionRef: MutableRefObject<Position>,
    setPosition: (event: LayoutChangeEvent) => void
] => {
    const positionRef = React.useRef<Position>({
        width: 0,
        height: 0,
        pageX: 0,
        pageY: 0,
    })

    const setPosition = (lay: Position): void => {
        positionRef.current = lay
    }

    const onLayout = React.useCallback((event: LayoutChangeEvent): void => {
        ;(event.target as any).measure(
            (
                x: number,
                y: number,
                width: number,
                height: number,
                pageX: number,
                pageY: number
            ) => {
                console.log('Onlayout', x, y, width, height, pageX, pageY)
                setPosition({ width, height, pageX, pageY })
            }
        )
    }, callbackDependencies ?? [])

    return [positionRef, onLayout]
}

export default usePosition
