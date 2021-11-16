import React from 'react'
import styled from 'styled-components'
import { RecipeSortOptions } from '@recipes/api-types/v1'
import { View, Text, Modal, Icons } from '@/components/base'
import { Button, IconButton } from '@/components/atoms'
import { SortRow } from '@/components/molecules'
import { useAppDispatch, useSettings, useSort } from '@/hooks'
import { sortActions } from '@/redux'

type SortModalProps = {
    toggle: () => void
}

function SortModal({ toggle }: SortModalProps): JSX.Element {
    const { theme } = useSettings()
    const dispatch = useAppDispatch()
    const sort = useSort()
    const sortOptions = Object.keys(sort.state) as RecipeSortOptions[]

    const title = 'Sort (order matters)'

    return (
        <Container backgroundColor={theme.background}>
            <IconButton
                type={Icons.MyMaterialIcons}
                name="arrow-back"
                onPress={toggle}
                size="l"
            />
            <SubContainer>
                <Title type="Header" color={theme.primary} paddingVertical="s">
                    {title}
                </Title>
                {sortOptions.map((sortOption, index: number) => {
                    const position = sort.order.indexOf(sortOption)
                    return (
                        <SortRow
                            key={index}
                            position={position}
                            option={sortOption}
                        />
                    )
                })}
                <Button
                    marginVertical="l"
                    width="s"
                    type="Solid"
                    text="Reset"
                    onPress={() => dispatch(sortActions.reset())}
                />
            </SubContainer>
        </Container>
    )
}

export default SortModal

const Container = styled(Modal)`
    flex: 1;
`

const SubContainer = styled(View)`
    align-items: center;
`

const Title = styled(Text)``
