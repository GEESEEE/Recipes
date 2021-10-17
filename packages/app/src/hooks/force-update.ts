import React from 'react'

export default function useForceUpdate(): () => void {
    const [val, setValue] = React.useState(0)
    return () => setValue(val + 1)
}
