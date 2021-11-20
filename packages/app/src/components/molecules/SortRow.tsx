import React from 'react'
import styled from 'styled-components'
import { BooleanString, RecipeSortOptions } from '@recipes/api-types/v1'
import { IconButton } from '../atoms'
import { View, Text, Icons } from '@/components/base'
import { useAppDispatch, useSort } from '@/hooks'
import { sortActions } from '@/redux'

type SortRowProps = {
    option: RecipeSortOptions
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

function SortRow({ option }: SortRowProps): JSX.Element {
    const dispatch = useAppDispatch()
    const sort = useSort()
    const position = sort.order.indexOf(option)
    const state = sort.state[option].toString() as BooleanString
    const selected = position !== -1

    return (
        <RowContainer marginVertical="s">
            <Position type="SubHeader" marginHorizontal="s">
                {selected ? position + 1 : ''}
            </Position>

            <SortName type="SubHeader">{names[option]}</SortName>
            <SortValue>
                <Text type="SubHeader">{values(option)[state]}</Text>
                <IconButton
                    type={Icons.MyMaterialCommunityIcons}
                    name="swap-vertical"
                    onPress={() => dispatch(sortActions.swapSortState(option))}
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
