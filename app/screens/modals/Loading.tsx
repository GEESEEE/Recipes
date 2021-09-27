import React from 'react'
import { Modal, View } from 'react-native'
import styled from 'styled-components'
import { Loading4Dots } from '@/components/animations'
import { useAppSelector } from '@/hooks'
import { colors } from '@/config'

function LoadingModal(): JSX.Element {
    const {theme} = useAppSelector((state) => state.settings)
    return (
        <ModalContainer transparent statusBarTranslucent >
            <Container>
                <Loading4Dots
                    backgroundColor={theme.background}
                    dotColor={colors.primaryBlue}
                />
            </Container>
        </ModalContainer>
    )
}

export default LoadingModal

const ModalContainer = styled(Modal)`
    margin: 0;
`

const Container = styled(View)`
    flex: 1;
    background-color: ${(props) => props.theme.background};
`
