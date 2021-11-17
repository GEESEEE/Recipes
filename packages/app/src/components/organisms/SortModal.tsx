import React from 'react'
import styled from 'styled-components'
import { BooleanString, RecipeSortOptions } from '@recipes/api-types/v1'
import { View, Text, Modal, Icons } from '@/components/base'
import { Button, IconButton } from '@/components/atoms'

import { useAppDispatch, useSettings, useSort } from '@/hooks'
import { sortActions } from '@/redux'

type SortModalProps = {
    toggle: () => void
}

const names: { [key in RecipeSortOptions]: string } = {
    createtime: 'Creation Time',
    publishtime: 'Publish Time',
    preparetime: 'Prepare Time',
    peoplecount: 'People Count',
    ingredientcount: 'Ingredient Count',
    instructioncount: 'Instruction Count',
}

const oldNewOptions = ['createtime', 'publishtime']
const lowHighOptions = [
    'peoplecount',
    'ingredientcount',
    'instructioncount',
    'preparetime',
]

function values(option: RecipeSortOptions): { [key in BooleanString]: string } {
    if (oldNewOptions.includes(option)) {
        return {
            true: 'old - new',
            false: 'new - old',
        }
    } else if (lowHighOptions.includes(option)) {
        return {
            true: 'low - high',
            false: 'high - low',
        }
    }
    return {
        true: 'true',
        false: 'false',
    }
}

function SortModal({ toggle }: SortModalProps): JSX.Element {
    const { theme } = useSettings()
    const dispatch = useAppDispatch()
    const sort = useSort()
    const sortOptions = Object.keys(sort.state) as RecipeSortOptions[]

    const title = 'Sort (order matters)'

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
                    {sortOptions.map((option, index: number) => {
                        const position = sort.order.indexOf(option)
                        const selected = position !== -1
                        const state = sort.state[
                            option
                        ].toString() as BooleanString
                        return (
                            <RowContainer marginVertical="s" key={index}>
                                <Position type="SubHeader" marginHorizontal="s">
                                    {selected ? position + 1 : ''}
                                </Position>

                                <SortName type="SubHeader">
                                    {names[option]}
                                </SortName>
                                <SortValue>
                                    <Text type="SubHeader">
                                        {values(option)[state]}
                                    </Text>
                                    <IconButton
                                        type={Icons.MyMaterialCommunityIcons}
                                        name="swap-vertical"
                                        onPress={() =>
                                            dispatch(
                                                sortActions.swapSortState(
                                                    option
                                                )
                                            )
                                        }
                                        size="l"
                                    />
                                </SortValue>
                                <ApplyButton
                                    type={Icons.MyFeather}
                                    name={selected ? 'x' : 'plus'}
                                    onPress={() => {
                                        dispatch(
                                            selected
                                                ? sortActions.removeSort(option)
                                                : sortActions.addSort(option)
                                        )
                                    }}
                                    marginHorizontal="s"
                                    size="l"
                                />
                            </RowContainer>
                        )
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

const RowContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`

const Position = styled(Text)`
    width: 5%;
`

const SortName = styled(Text)`
    flex: 3;
    align
`

const SortValue = styled(View)`
    flex: 2;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const ApplyButton = styled(IconButton)`
    flex: 1;
    align-items: flex-end;
`
