import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity, View, Text} from '@/components/base'
import { useAppSelector } from '@/hooks'

type TextWithElementProps = {
    text: string
    element: JSX.Element
    onPress?: () => void
}

function PressableTextWithElement({
    text, element, onPress,
}: TextWithElementProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <Container onPress={onPress} >
            <StyledText type='SubHeader' weight='normal' >{text}</StyledText>
            <StyledElement>{element}</StyledElement>
        </Container>
    )
}

export default PressableTextWithElement

const Container = styled(TouchableOpacity)`
    flex-direction: row;
`

const StyledText = styled(Text)`
    flex: 3;
    justify-content: center;
`

const StyledElement = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
`
