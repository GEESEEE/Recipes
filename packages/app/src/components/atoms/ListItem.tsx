import React from 'react'
import styled from 'styled-components'
import DropdownMenu, { DropdownItem } from './DropdownMenu'
import { View } from '@/components/base'
import { useAppSelector } from '@/hooks'

type ListItemProps = {
    items?: DropdownItem[]
    dropDownDependencies?: number[]
}

function ListItem({
    children,
    items,
    dropDownDependencies,
}: React.PropsWithChildren<ListItemProps>): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    return (
        <Container
            width="l"
            borderRadius="s"
            backgroundColor={theme.backgroundVariant}
            paddingVertical="s"
            paddingHorizontal="s"
            marginVertical="s"
        >
            <ItemContainer>{children}</ItemContainer>
            {items ? (
                <DropdownMenu
                    items={items}
                    dependencies={dropDownDependencies}
                />
            ) : null}
        </Container>
    )
}

export default ListItem

const Container = styled(View)`
    flex-direction: row;
    align-items: center;
    align-content: space-between;
    align-self: center;
`

const ItemContainer = styled(View)`
    flex: 1;
`
