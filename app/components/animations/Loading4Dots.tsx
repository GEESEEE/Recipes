import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import Lottie from 'lottie-react-native'
import * as LoadingAnimation from '@/assets/animations/Loading4Dots.json'

interface Loading4DotsProps {
    backgroundColor: string
    dotColor: string
    height?: number | string
    width?: number | string
}

function Loading4Dots({
    backgroundColor,
    dotColor,
    height,
    width
}: Loading4DotsProps): JSX.Element {
    const colorFilters = [
        {
            keypath: 'Back',
            color: backgroundColor,
        },
        {
            keypath: 'Dot1',
            color: dotColor,
        },
        {
            keypath: 'Dot2',
            color: dotColor,
        },
        {
            keypath: 'Dot3',
            color: dotColor,
        },
        {
            keypath: 'Dot4',
            color: dotColor,
        },
    ]

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
