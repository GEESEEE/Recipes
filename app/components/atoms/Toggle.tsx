import React from 'react'
import { Switch, SwitchProps } from 'react-native'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'
import { useAppSelector } from '@/hooks'

type ToggleProps = LayoutProps &
    SwitchProps

function Toggle({
    disabled,
    ...rest
}: ToggleProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    const thumbColor = disabled ? theme.grey : theme.primary

    return (
        <Switch
            trackColor={{
                true: theme.backgroundVariant,
                false: theme.backgroundVariant,
            }}
            thumbColor={thumbColor}
            disabled={disabled}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    )
}
export default withLayoutProps(Toggle as any)
