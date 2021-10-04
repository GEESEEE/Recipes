import React from 'react'
import { Switch, SwitchProps } from 'react-native'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'
import { useAppSelector } from '@/hooks'

type ToggleProps = {
    switchValue: boolean
    onValueChange: (val: boolean) => void
}
& LayoutProps
& SwitchProps

function Toggle({
    switchValue,
    onValueChange,
    disabled,
    ...rest
}: ToggleProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    const thumbColor = disabled ? theme.grey : theme.primary

    return (
        <Switch
            value={switchValue}
            onValueChange={onValueChange}
            trackColor={{
                true: theme.backgroundVariant,
                false: theme.backgroundVariant,
            }}
            thumbColor={thumbColor}

            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    )
}
export default withLayoutProps(Toggle)
