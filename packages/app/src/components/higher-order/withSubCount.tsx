import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { LayoutProps } from './withLayoutProps'
import { Text, View } from '@/components/base'
import { useSettings } from '@/hooks'

type SubCountPosition =
    | 'bottom-right'
    | 'bottom-left'
    | 'top-left'
    | 'top-right'

export type SubCountProps = {
    subCount?: number
    subPosition?: SubCountPosition
    color?: string
} & LayoutProps

function withSubCount<T extends SubCountProps>(
    WrappedComponent: React.ComponentType<T>
): (props: T) => JSX.Element {
    return ({
        subCount,
        subPosition = 'bottom-right',
        color,
        ...rest
    }): JSX.Element => {
        const { theme } = useSettings()
        if (typeof subCount === 'undefined') {
            return <WrappedComponent color={color} {...(rest as T)} />
        }

        const subCountStyle: StyleProp<ViewStyle> = {
            position: 'absolute',
        }

        const positions = subPosition.split('-')
        for (const position of positions) {
            // @ts-expect-error typeof SubCountProps ensures this is valid
            subCountStyle[position] = -3
        }

        return (
            <View>
                <WrappedComponent color={color} {...(rest as T)} />
                <Text
                    type="SubText"
                    weight="bold"
                    style={subCountStyle}
                    color={color}
                    borderRadius="s"
                    paddingHorizontal="s"
                >
                    {subCount === 0 ? '' : subCount}
                </Text>
            </View>
        )
    }
}

export default withSubCount
