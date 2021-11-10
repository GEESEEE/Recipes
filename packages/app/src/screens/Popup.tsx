import React from 'react'
import styled from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PopupMenu } from '@/components/atoms'

function PopupScreen(): JSX.Element {
    const route = useRoute()
    const navigation = useNavigation<any>()
    const { title, description } = route.params as any

    return (
        <Container>
            <PopupMenu
                title={title}
                message={description}
                buttons={[
                    {
                        text: 'OK',
                        callback: () => navigation.pop(),
                    },
                ]}
            />
        </Container>
    )
}

export default PopupScreen

const Container = styled(SafeAreaView)`
    flex: 1;
    align-items: center;
    justify-content: center;
`
