import React from 'react'
import styled from 'styled-components'
import { Loading4Dots } from '@/components/animations'
import { useAppSelector } from '@/hooks'
import { colors } from '@/config'
import { Modal } from '@/components/base'

function LoadingModal(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <Container backgroundColor={theme.background}>
            <Loading4Dots
                backgroundColor={theme.background}
                dotColor={colors.primaryBlue}
                width="100%"
            />
        </Container>
    )
}

export default LoadingModal

const Container = styled(Modal)`
    align-items: center;
    justify-content: center;
`
