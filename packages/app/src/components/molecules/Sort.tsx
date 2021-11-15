import React from 'react'
import styled from 'styled-components'
import { View, Text, Modal, Icons } from '@/components/base'
import { IconButton } from '@/components/atoms'
import { useSettings } from '@/hooks'

type SortModalProps = {
    toggle: () => void
}

function SortModal({ toggle }: SortModalProps): JSX.Element {
    const { theme } = useSettings()

    return (
        <Container backgroundColor={theme.background}>
            <IconButton
                type={Icons.MyMaterialIcons}
                name="arrow-back"
                onPress={toggle}
                size="l"
            />
            <Text>Yes</Text>
        </Container>
    )
}

export default SortModal

const Container = styled(Modal)`
    flex: 1;
`
