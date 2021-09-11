import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import {
    removeSort,
    addSort,
    swapSort,
    toggleSort,
    SortType,
} from '../../actions/sort'
import { inElementOf, indexOfIncludedElement } from '../../config/utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { BROWSE_SORT_ACTIONS } from '../../reducers/browse'
import { MY_SORT_ACTIONS } from '../../reducers/my'
import { MyMaterialCommunityIcons } from '../Icons'
import { ButtonIcon, FeatherButton } from './Buttons'

function SortRow({
    type,
    name,
    options,
    routeName,
}: SortType & { routeName: string }): JSX.Element {
    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    const globalState = useAppSelector((state) => state)

    const sortState =
        routeName === 'Main' ? globalState.browseSort : globalState.mySort

    const addType =
        routeName === 'Main'
            ? BROWSE_SORT_ACTIONS.ADD_SORT
            : MY_SORT_ACTIONS.ADD_SORT
    const removeType =
        routeName === 'Main'
            ? BROWSE_SORT_ACTIONS.REMOVE_SORT
            : MY_SORT_ACTIONS.REMOVE_SORT
    const swapType =
        routeName === 'Main'
            ? BROWSE_SORT_ACTIONS.SWAP_SORT
            : MY_SORT_ACTIONS.SWAP_SORT
    const toggleType =
        routeName === 'Main'
            ? BROWSE_SORT_ACTIONS.TOGGLE_SORT
            : MY_SORT_ACTIONS.TOGGLE_SORT

    const selected = inElementOf(sortState.sortState, type)
    const order = sortState.orders[type]

    const callback = selected
        ? removeSort(removeType, type)
        : addSort(addType, type, order)

    const toggleOrder = selected
        ? () => dispatch(swapSort(swapType, type))
        : () => dispatch(toggleSort(toggleType, type))

    return (
        <FilterContainer>
            <FilterPosition>
                {selected
                    ? indexOfIncludedElement(sortState.sortState, type) + 1
                    : null}
            </FilterPosition>
            <FilterRowContainer>
                <FilterText
                    style={{ color: selected ? theme.primary : theme.text }}
                >
                    {name}
                </FilterText>

                <FilterOptionsView>
                    <FilterOptions>
                        {order ? options[0] : options[1]}
                    </FilterOptions>
                    <ButtonIcon
                        icon={
                            <MyMaterialCommunityIcons
                                name="swap-vertical"
                                color={theme.primary}
                                size={25}
                            />
                        }
                        onPress={toggleOrder}
                    />
                </FilterOptionsView>

                <FinalButtonView>
                    <FeatherButton
                        iconName={selected ? 'x' : 'plus'}
                        onPress={() => dispatch(callback)}
                    />
                </FinalButtonView>
            </FilterRowContainer>
        </FilterContainer>
    )
}

export default SortRow

const FilterContainer = styled(View)`
    width: 100%;
    flex-direction: row;
    align-items: center;
`

const FilterPosition = styled(Text)`
    width: 8%;
    color: ${(props) => props.theme.text};
    font-size: 16px;
    padding-left: 5px;
`

const FilterRowContainer = styled(View)`
    width: 90%;
    flex-direction: row;
    align-items: center;
`

const FilterText = styled(Text)`
    width: 50%;
    color: ${(props) => props.theme.primary};
    font-size: 16px;
`

const FilterOptionsView = styled(View)`
    width: 35%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const FilterOptions = styled(Text)`
    flex: 1;
    color: ${(props) => props.theme.text};
    font-size: 16px;
`

const FinalButtonView = styled(View)`
    width: 15%;
    align-items: flex-end;
`
