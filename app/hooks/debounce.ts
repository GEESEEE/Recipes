import { useEffect } from 'react'
import useTimeout from './timeout'

export default function useDebounce(
    callback: () => any,
    delay: number,
    dependencies: any[]
): void {
    const { reset, clear } = useTimeout(callback, delay)
    useEffect(reset, [...dependencies, reset])
    useEffect(clear, [])
}
