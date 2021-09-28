import React from 'react'
import { View, Modal } from 'react-native'
import styled from 'styled-components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Loading4Dots } from '@/components/animations'
import { useAppSelector } from '@/hooks'
import { colors } from '@/config'

function LoadingModal(): JSX.Element {
    const {theme} = useAppSelector((state) => state.settings)
    const insets = useSafeAreaInsets()
    return (
        <Modal
            statusBarTranslucent
        >
            <Container style={{
                paddingTop: insets.top,
                paddingLeft: insets.left,
                paddingRight: insets.right,
                paddingBottom: insets.bottom
            }}>
                <Loading4Dots
                    backgroundColor={theme.background}
                    dotColor={colors.primaryBlue}
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
