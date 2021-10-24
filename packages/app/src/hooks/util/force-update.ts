import React from 'react'

export function useForceUpdate(): () => void {
    const [val, setValue] = React.useState(0)
    return () => setValue(val + 1)
}
