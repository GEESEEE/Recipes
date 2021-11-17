import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
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
}

function withSubCount<T extends SubCountProps>(
    WrappedComponent: React.ComponentType<T>
): (props: T) => JSX.Element {
    return ({
        subCount,
        subPosition = 'bottom-right',
        ...rest
    }): JSX.Element => {
        const { theme } = useSettings()
        if (typeof subCount === 'undefined') {
            return <WrappedComponent {...(rest as T)} />
        }

        const subCountStyle: StyleProp<ViewStyle> = {
            position: 'absolute',
        }

        const positions = subPosition.split('-')
        for (const position of positions) {
            // @ts-expect-error typeof SubCountProps ensures this is valid
            subCountStyle[position] = 0
        }

        return (
            <View>
                <WrappedComponent {...(rest as T)} />
                <Text
                    type="SubText"
                    weight="semiBold"
                    style={subCountStyle}
                    color={theme.primary}
                >
                    {subCount === 0 ? '' : subCount}
                </Text>
            </View>
        )
    }
}

export default withSubCount
