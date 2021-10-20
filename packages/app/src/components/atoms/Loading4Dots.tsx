import React from 'react'
import styled from 'styled-components'
import Lottie from 'lottie-react-native'
import { View } from '@/components/base'
import * as LoadingAnimation from '@/assets/animations/Loading4Dots.json'
import { useAppSelector } from '@/hooks'

type Loading4DotsProps = {
    backgroundColor?: string
    dotColor?: string
    height?: number | string
    width?: number | string
}

function Loading4Dots({
    backgroundColor,
    dotColor,
    height,
    width,
}: Loading4DotsProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    const dots = Array.from({ length: 4 }, (_, i) => i + 1)
    const colorFilters = dots.map((dot) => ({
        keypath: `Dot${dot}`,
        color: dotColor || theme.primary,
    }))
    colorFilters.push({
        keypath: 'Back',
        color: backgroundColor || theme.background,
    })

    return (
        <Container>
            <Lottie
                source={LoadingAnimation}
                colorFilters={colorFilters}
                style={{ height, width }}
                autoPlay
                loop
            />
        </Container>
    )
}

export default Loading4Dots

const Container = styled(View)`
    align-items: center;
    justify-content: center;
`
