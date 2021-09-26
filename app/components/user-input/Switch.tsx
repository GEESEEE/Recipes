import React from 'react'
import { Switch } from 'react-native'
import { useAppSelector } from '@/hooks'

interface SwitchProps {
    switchValue: boolean
    onValueChange: (val: boolean) => void
}

function SwitchComponent({
    switchValue,
    onValueChange,
}: SwitchProps): JSX.Element {
    const {theme} = useAppSelector((state) => state.settings)

    return (
        <Switch
            value={switchValue}
            onValueChange={onValueChange}
            trackColor={{
                true: theme.backgroundVariant,
                false: theme.backgroundVariant,
            }}
            thumbColor={theme.primary}
        />
    )
}
export default SwitchComponent
