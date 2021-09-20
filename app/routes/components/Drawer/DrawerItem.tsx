import React from 'react'
import styled from 'styled-components'
import { View } from 'react-native'


interface DrawerItemProps {
    children: JSX.Element[]
}

function DrawerItem({
    children
}: DrawerItemProps): JSX.Element {

    return (
        <Container>
            {children}
        </Container>
    )
}

export default DrawerItem

const Container = styled(View)`
    flex: 1;
`
