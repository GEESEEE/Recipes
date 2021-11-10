import React from 'react'
import styled from 'styled-components'
import { View, Text, Modal } from '@/components/base'
import { Button } from '@/components/atoms'
import { useSettings } from '@/hooks'

type Butt = {
    text: string
    callback: () => void
}

type ConfirmationModalProps = {
    title: string
    message?: string
    buttons: Butt[]
}

function PopupMenu({
    title,
    message,
    buttons,
}: ConfirmationModalProps): JSX.Element {
    const { theme } = useSettings()

    return (
        <Container>
            <MessageContainer
                borderColor={theme.primary}
                borderWidth="s"
                borderRadius="s"
                width="m"
                paddingVertical="s"
                paddingHorizontal="m"
                backgroundColor={theme.background}
            >
                <Text paddingVertical="s" type="SubHeader">
                    {title}
                </Text>
                {message ? <Text>{message}</Text> : null}
                <ButtonRow>
                    {buttons.map((button) => {
                        return (
                            <RowButton
                                key={buttons.indexOf(button)}
                                type="Clear"
                                text={button.text}
                                onPress={button.callback}
                                width="s"
                                textTransform="uppercase"
                            />
                        )
                    })}
                </ButtonRow>
            </MessageContainer>
        </Container>
    )
}

export default PopupMenu

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
    flex: 1;
`
