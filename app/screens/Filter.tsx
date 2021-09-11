import React from "react"
import styled from "styled-components"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text } from "react-native"
import { State } from "react-native-gesture-handler"
import { ButtonIcon, FeatherButton } from "../components/user-input/Buttons"
import { useAppDispatch, useAppSelector, useToggle } from "../hooks"
import { MyMaterialCommunityIcons } from "../components/Icons"
import { BROWSE_SORT_ACTIONS } from "../reducers/browse-sort"
import { indexOfIncludedElement, inElementOf } from "../config/utils"
import { addSort, RecipeSortType, removeSort, swapSort } from "../actions/sort"

interface Filter {
    type: RecipeSortType,
    name: string,
    options: string[],
}

export const filters: Filter[] = [{
    type: "publishtime",
    name: "Publish time",
    options: ["new - old", "old - new"],
}, {
    type: "preparetime",
    name: "Prepare time",
    options: ["ascending", "descending"]
}, {
    type: "peoplecount",
    name: "People count",
    options: ["ascending", "descending"]
}, {
    type: "ingredientcount",
    name: "Ingredient count",
    options: ["ascending", "descending"]
}, {
    type: "instructioncount",
    name: "Instruction count",
    options: ["ascending", "descending"]
}]

const Filter = ({ navigation }: { navigation: any}): JSX.Element => {
    const { routeName } = navigation.state.params?.route
    const globalState = useAppSelector((state) => state)

    let sortState: string[] = []
    if (routeName === 'Main') {
        sortState = globalState.browseSort
    }


    return (
        <Container>
            <ReturnButtonContainer>
                <FeatherButton
                    iconName="arrow-left"
                    onPress={() => navigation.pop()}
                    size={35}
                />
            </ReturnButtonContainer>

            <CategoryHeader>Sort (order matters)</CategoryHeader>
            {filters.map((filter) =>
                <FilterRow
                    type={filter.type}
                    name={filter.name}
                    options={filter.options}
                    sortState={globalState.browseSort}
                />
            )}
        </Container>
    )
}

export default Filter



const FilterRow = ({
    type,
    name,
    options,
    sortState
}: Filter & {sortState: string[]}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()
    const [order, toggle] = useToggle(true)

    const selected = inElementOf(sortState, type)

    const callback = selected
        ? removeSort(BROWSE_SORT_ACTIONS.REMOVE_SORT, type)
        : addSort(BROWSE_SORT_ACTIONS.ADD_SORT, type, order)

    const toggleOrder = selected
        ? () => {toggle(); dispatch(swapSort(BROWSE_SORT_ACTIONS.SWAP_SORT, type)) }
        : () => toggle()

    return (
        <FilterContainer>
            <FilterPosition>{selected ? indexOfIncludedElement(sortState, type) + 1 : null}</FilterPosition>
            <FilterRowContainer>
                <FilterText style={{color: selected ? theme.primary : theme.text}} >{name}</FilterText>

                <FilterOptionsView>
                    <FilterOptions>{order ? options[0] : options[1]}</FilterOptions>
                    <ButtonIcon
                        icon={<MyMaterialCommunityIcons
                            name="swap-vertical"
                            color={theme.primary}
                            size={25}
                        />}
                        onPress={toggleOrder}
                    />
                </FilterOptionsView>

                <FinalButtonView>
                    <FeatherButton
                        iconName={selected ? "x" : "plus"}
                        onPress={() => dispatch(callback)}
                    />
                </FinalButtonView>
            </FilterRowContainer>

        </FilterContainer>
    )
}


const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props) => props.theme.background};
    align-items: center;
    justify-content: flex-start;
`

const ReturnButtonContainer = styled(View)`
    width: 100%;
    height: 50px;
    padding-left: 10px;
`

const CategoryHeader = styled(Text)`
    width: 90%;
    color: ${(props) => props.theme.primary};
    font-size: 20px;
    align-content: flex-start;
`

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
