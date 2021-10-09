import React from 'react'
import { Modal as RNModal } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import View from './View'
import { withLayoutProps, LayoutProps } from '@/components/higher-order'

type ModalProps = {
    backgroundColor?: string
} & LayoutProps

function Modal({
    backgroundColor,
    children,
    style,
    ...rest
}: ModalProps): JSX.Element {
    const insets = useSafeAreaInsets()
    return (
        <RNModal statusBarTranslucent animationType="slide" transparent>
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
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
            >
                {children}
            </Container>
        </RNModal>
    )
}

export default withLayoutProps(Modal)

const Container = styled(View)`
    flex: 1;
`
