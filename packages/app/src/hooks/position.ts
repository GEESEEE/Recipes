import React, { useState } from 'react'
import { Position } from '@/types'

export function usePosition(): [
    number,
    number,
    React.Dispatch<React.SetStateAction<Position>>
] {
    const [position, setPosition] = useState<Position>({
        pageX: 0,
        pageY: 0,
        locationX: 0,
        locationY: 0,
    })

    const pageX = position.pageX - position.locationX
    const pageY = position.pageY - position.locationY

    return [pageX, pageY, setPosition]
}
