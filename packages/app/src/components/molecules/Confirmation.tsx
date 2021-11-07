import React from 'react'
import styled from 'styled-components'
import { View, Text, Modal } from '@/components/base'
import { Button } from '@/components/atoms'
import { useSettings } from '@/hooks'

type ConfirmationModalProps = {
    // toggle: () => void
    title: string
    message: string
    confirm?: string
    cancel?: string
    onConfirm: () => void
    onCancel: () => void
}

function ConfirmationModal({
    title,
    message,
    confirm,
    cancel,
    onConfirm,
    onCancel,
}: ConfirmationModalProps): JSX.Element {
    const { theme } = useSettings()

    return (
        <Container>
            <MessageContainer
                borderColor={theme.primary}
                borderWidth="s"
                borderRadius="s"
                width="m"
                paddingVertical="m"
                paddingHorizontal="m"
                backgroundColor={theme.background}
            >
                <Text type="SubHeader">{title}</Text>
                <Text paddingVertical="m">{message}</Text>
                <ButtonRow>
                    <RowButton
                        type="Clear"
                        text={confirm ? confirm : 'Confirm'}
                        onPress={onConfirm}
                        width="s"
                    />
                    <RowButton
                        type="Clear"
                        text={cancel ? cancel : 'Cancel'}
                        onPress={onCancel}
                        width="s"
                    />
                </ButtonRow>
            </MessageContainer>
        </Container>
    )
}

export default ConfirmationModal

const Container = styled(Modal)`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const MessageContainer = styled(View)`
    align-items: center;
    justify-content: center;
`

const ButtonRow = styled(View)`
    flex-direction: row;
`

const RowButton = styled(Button)`
    width: 50%;
`
