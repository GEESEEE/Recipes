import React from 'react'
import { useIsFocused } from '@react-navigation/native'
import useDebounce from './util/debounce'

export default function useDropdownRerender(
    condition: boolean,
    delay: number
): any {
    const [scrollPosition, setScrollPosition] = React.useState(0)
    function handleScroll(event: any): void {
        setScrollPosition(event.nativeEvent.contentOffset.y)
    }

    const isFocused = useIsFocused()
    useDebounce(
        () => {
            if (condition && isFocused) {
                setScrollPosition(scrollPosition + 1)
            }
        },
        delay,
        [isFocused]
    )

    return [scrollPosition, handleScroll]
}
