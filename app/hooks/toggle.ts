import { useState } from 'react'

export default function useToggle(defaultValue: boolean): [boolean, (arg?: boolean) => void] {
    const [value, setValue] = useState(defaultValue)

    function toggleValue(val?: boolean): void {
        setValue(typeof val !== 'undefined' ? val : !value)
    }

    return [value, toggleValue]
}
