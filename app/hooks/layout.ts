import React, { MutableRefObject } from 'react'
import { LayoutChangeEvent } from 'react-native'

export type Layout = {
    width: number, height: number, pageX: number, pageY: number
}

const useLayout = (): [
    layoutRef: MutableRefObject<Layout>, onLayout: (event: LayoutChangeEvent) => void
] => {
    const layoutRef = React.useRef<Layout>({
        width: 0, height: 0, pageX: 0, pageY: 0,
    })

    const setLayout = (lay: Layout): void => {
        console.log("Setting", lay)
        layoutRef.current = lay
        console.log(layoutRef)
    }

    const onLayout = React.useCallback((event: LayoutChangeEvent): void => {
        (event.target as any).measure(
            (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
                console.log("Measurements", x, y, width, height, pageX, pageY)
                setLayout({width, height, pageX, pageY})
            },
        );
    }, [])

    return [layoutRef, onLayout]
}

export default useLayout
