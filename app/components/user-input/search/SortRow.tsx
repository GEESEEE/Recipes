import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { sortActions } from '@/actions'
import { utils } from '@/config'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { BROWSE_SORT_ACTIONS, MY_SORT_ACTIONS } from '@/reducers'
import { MyMaterialCommunityIcons } from '../../Icons'
import { ButtonIcon, FeatherButton } from '../Buttons'

function SortRow({
    type,
    name,
    options,
    routeName,
    header,
}: sortActions.SortType & {
    routeName: string
    header?: boolean
}): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    const dispatch = useAppDispatch()

    const globalState = useAppSelector((state) => state)

    const sortState =
        routeName === 'Browse' ? globalState.browseSort : globalState.mySort

    const SORT_ACTIONS =
        routeName === 'Browse' ? BROWSE_SORT_ACTIONS : MY_SORT_ACTIONS

    const selected = utils.inElementOf(sortState.sortState, type)
    const order = sortState.orders[type]

    const callback = selected
        ? sortActions.removeSort(SORT_ACTIONS.REMOVE_SORT, type)
        : sortActions.addSort(SORT_ACTIONS.ADD_SORT, type, order)

    const toggleOrder = selected
        ? sortActions.swapSort(SORT_ACTIONS.SWAP_SORT, type)
        : sortActions.toggleSort(SORT_ACTIONS.TOGGLE_SORT, type)

    const filterTextColor = selected ? theme.primary : theme.text
    const fontSize = header ? 14 : 16
    const iconSize = header ? 20 : 25

    return (
        <FilterContainer>
            {header ? null : (
                <FilterPosition>
                    {selected
                        ? utils.indexOfIncludedElement(
                              sortState.sortState,
                              type
                          ) + 1
                        : null}
                </FilterPosition>
            )}

            <FilterRowContainer>
                <FilterText style={{ color: filterTextColor, fontSize }}>
                    {name}
                </FilterText>

                <FilterOptionsView>
                    <FilterOptions style={{ fontSize }}>
                        {order ? options[0] : options[1]}
                    </FilterOptions>
                    <ButtonIcon
                        icon={
                            <MyMaterialCommunityIcons
                                name="swap-vertical"
                                color={theme.primary}
                                size={iconSize}
                            />
                        }
                        onPress={() => dispatch(toggleOrder)}
                    />
                </FilterOptionsView>

                <FinalButtonView>
                    <FeatherButton
                        iconName={selected ? 'x' : 'plus'}
                        onPress={() => dispatch(callback)}
                        size={iconSize}
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
