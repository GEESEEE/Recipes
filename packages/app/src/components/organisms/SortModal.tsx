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

    const notSelectedOptions = sortOptions.filter(
        (option) => sort.order.indexOf(option) === -1
    )

    return (
        <Container backgroundColor={theme.background}>
            <SubContainer>
                <IconButton
                    type={Icons.MyMaterialIcons}
                    name="arrow-back"
                    onPress={toggle}
                    size="l"
                />
                <ContentContainer>
                    <Title
                        type="Header"
                        color={theme.primary}
                        paddingVertical="s"
                    >
                        {title}
                    </Title>
                    {sort.order.map((option, index: number) => {
                        return <SortRow key={index} option={option} />
                    })}
                    <Separator backgroundColor={theme.primary} />
                    {notSelectedOptions.map((option, index: number) => {
                        return <SortRow key={index} option={option} />
                    })}
                    <Button
                        marginVertical="l"
                        width="s"
                        type="Solid"
                        text="Reset"
                        onPress={() => dispatch(sortActions.reset())}
                    />
                </ContentContainer>
            </SubContainer>
        </Container>
    )
}

export default SortModal

const Container = styled(Modal)`
    flex: 1;
    align-items: center;
`

const SubContainer = styled(View)`
    width: 95%;
`

const ContentContainer = styled(View)`
    align-items: center;
`

const Title = styled(Text)``

const Separator = styled(View)`
    width: 100%;
    height: 1px;
`
