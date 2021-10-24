import { useEffect, useRef } from 'react'

export function useUpdateEffect(
    callback: () => any,
    dependencies: any[]
): void {
    const firstRenderRef = useRef(true)

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
            return undefined
        }

        return callback()
    }, dependencies)
}
