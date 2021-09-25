import React from 'react'
import { Modal, View } from 'react-native'
import styled from 'styled-components'
import { Loading4Dots } from '@/components/animations'
import { useAppSelector } from '@/hooks'

function LoadingModal(): JSX.Element {
    const {theme} = useAppSelector((state) => state)
    return (
        <Modal transparent>
            <Container>
                <Loading4Dots
                    backgroundColor={theme.background}
                    dotColor={theme.primary}
                />
            </Container>
        </Modal>
    )
}

export default LoadingModal

const Container = styled(View)`
    flex: 1;
    background-color: ${(props) => props.theme.background};
`
