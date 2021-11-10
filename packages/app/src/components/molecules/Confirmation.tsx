import React from 'react'
import styled from 'styled-components'
import { Modal } from '@/components/base'
import { PopupMenu } from '@/components/atoms'

type ConfirmationModalProps = {
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
    return (
        <Container>
            <PopupMenu
                title={title}
                message={message}
                buttons={[
                    {
                        text: confirm ? confirm : 'Confirm',
                        callback: onConfirm,
                    },
                    {
                        text: cancel ? cancel : 'Cancel',
                        callback: onCancel,
                    },
                ]}
            />
        </Container>
    )
}

export default ConfirmationModal

const Container = styled(Modal)`
    flex: 1;
    align-items: center;
    justify-content: center;
`
