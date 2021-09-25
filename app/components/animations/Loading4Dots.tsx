import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import Lottie from 'lottie-react-native'
import * as LoadingAnimation from '@assets/animations/Loading4Dots.json'

interface Loading4DotsProps {
    backgroundColor: string
    dotColor: string
    height: number
}

function Loading4Dots({
    backgroundColor,
    dotColor,
    height,
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
                autoSize
                style={{ height }}
                autoPlay
                loop
            />
        </Container>
    )
}

export default Loading4Dots

const Container = styled(View)`
    flex: 1;
    align-items: center;
`
