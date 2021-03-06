import React from 'react'
import { Switch, SwitchProps } from 'react-native'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'
import { useSettings } from '@/hooks'

export type ToggleProps = LayoutProps & SwitchProps

function Toggle({ disabled, ...rest }: ToggleProps): JSX.Element {
    const { theme } = useSettings()

    const thumbColor = disabled ? theme.grey : theme.primary

    return (
        <Switch
            trackColor={{
                true: theme.backgroundVariant,
                false: theme.backgroundVariant,
            }}
            thumbColor={thumbColor}
            disabled={disabled}
            {...rest}
        />
    )
}
export default withLayoutProps(Toggle)
