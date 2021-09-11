import { useState } from "react"

export default function useArray<T>(defaultValue: T[]): any {
  const [array, setArray] = useState(defaultValue)

  function push(element: T): void {
    setArray(a => [...a, element])
  }

  function filter(callback: (value: T) => boolean): void {
    setArray(a => a.filter(callback))
  }

  function update(index: number, newElement: T): void {
    setArray(a => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length - 1),
    ])
  }

  function remove(index: number): void{
    setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length - 1)])
  }

  function clear(): void {
    setArray([])
  }

  return { array, set: setArray, push, filter, update, remove, clear }
}
