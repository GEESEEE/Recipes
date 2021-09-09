import { useCallback, useEffect, useRef } from "react"

export default function useTimeout(callback: () => any, delay: number): {
    reset: () => void;
    clear: () => void;
} {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef<any>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    if (typeof timeoutRef.current !== "undefined") clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}
