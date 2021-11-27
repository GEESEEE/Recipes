import React from 'react'
import styled from 'styled-components'
import {
    requestPurchase,
    requestSubscription,
    useIAP,
    withIAPContext,
} from 'react-native-iap'
import { View, Text } from '@/components/base'
import { useSettings } from '@/hooks'

type PaymentScreenProps = {}

function PaymentScreen({}: PaymentScreenProps): JSX.Element {
    const { theme } = useSettings()

    // const {
    //     connected,
    //     products,
    //     subscriptions,
    //     getProducts,
    //     getSubscriptions,
    //     finishTransaction,
    //     currentPurchase,
    //     currentPurchaseError,
    // } = useIAP()

    return (
        <Container>
            <Text>Payment</Text>
        </Container>
    )
}

export default PaymentScreen

const Container = styled(View)`
    flex: 1;
`
