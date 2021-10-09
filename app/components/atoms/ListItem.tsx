import React from 'react'
import styled from 'styled-components'
import { View } from '@/components/base'
import DropdownMenu, { DropdownItem } from './DropdownMenu'
import { useAppSelector } from '@/hooks'


type ListItemProps = {
    functions: Array<() => (Promise<void> | void)>
    functionSuffix: string
}

function ListItem({
    children,
    functions,
    functionSuffix
}: React.PropsWithChildren<ListItemProps>): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    return (
        <Container
            width='l'
            borderRadius='s'
            backgroundColor={theme.backgroundVariant}
            paddingVertical='s'
            paddingHorizontal='s'
            marginVertical='s'
        >
            {children}
            <DropdownMenu
                functions={functions}
                functionSuffix={functionSuffix}
            />
        </Container>
    )
}

export default ListItem

const Container = styled(View)`
    flex-direction: row;
    align-items: center;
    align-content: space-between;
`

