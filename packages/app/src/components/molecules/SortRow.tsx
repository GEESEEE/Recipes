import React from 'react'
import styled from 'styled-components'
import { BooleanString, RecipeSortOptions } from '@recipes/api-types/v1'
import { IconButton } from '@/components/atoms'
import { Icons, View, Text } from '@/components/base'
import { sortActions } from '@/redux'
import { useAppDispatch, useSort } from '@/hooks'

type SortRowProps = {
    position: number
    option: RecipeSortOptions
    header?: boolean
}

const names: { [key in RecipeSortOptions]: string } = {
    createtime: 'Creation Time',
    publishtime: 'Publish Time',
    preparetime: 'Prepare Time',
    peoplecount: 'People Count',
    ingredientcount: 'Ingredient Count',
    instructioncount: 'Instruction Count',
}

function values(option: RecipeSortOptions): { [key in BooleanString]: string } {
    if (['createtime', 'publishtime', 'preparetime'].includes(option)) {
        return {
            true: 'old - new',
            false: 'new - old',
        }
    } else if (
        ['peoplecount', 'ingredientcount', 'instructioncount'].includes(option)
    ) {
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

function SortRow({ position, option, header }: SortRowProps): JSX.Element {
    const dispatch = useAppDispatch()
    const sort = useSort()

    const selected = position !== -1
    const state = sort.state[option].toString() as BooleanString

    return (
        <RowContainer>
            {header ? null : (
                <Position marginHorizontal="s">
                    {selected ? position + 1 : ''}
                </Position>
            )}

            <SortName>{names[option]}</SortName>
            <SortValue>
                <Text>{values(option)[state]}</Text>
                <IconButton
                    type={Icons.MyMaterialCommunityIcons}
                    name="swap-vertical"
                    onPress={() => dispatch(sortActions.swapSortState(option))}
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
            />
        </RowContainer>
    )
}

export default SortRow

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
