import React from 'react'
import { Modal as RNModal } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import KeyboardContainer from './KeyboardContainer'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'

export type ModalProps = {
    animationType?: 'slide' | 'none' | 'fade' | undefined
} & LayoutProps

function Modal({
    backgroundColor,
    animationType = 'slide',
    children,
    style,
    ...rest
}: ModalProps): JSX.Element {
    const insets = useSafeAreaInsets()
    return (
        <RNModal statusBarTranslucent animationType={animationType} transparent>
            <Container
                style={[
                    {
                        paddingTop: insets.top,
                        paddingLeft: insets.left,
                        paddingRight: insets.right,
                        paddingBottom: insets.bottom,
                        backgroundColor,
                    },
                    style,
                ]}
                {...rest}
            >
                {children}
            </Container>
        </RNModal>
    )
}

export default withLayoutProps(Modal)

const Container = styled(KeyboardContainer)`
    flex: 1;
`
