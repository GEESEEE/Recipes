import React from "react"
import styled from "styled-components"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text } from "react-native"
import { v4 as uuid } from 'uuid'
import { FeatherButton } from "../components/user-input/Buttons"
import { useAppSelector} from "../hooks"
import {  RecipeSortType, SortStateType } from "../actions/sort"
import SortRow from "../components/user-input/SortRow"

export interface SortType {
    type: RecipeSortType,
    name: string,
    options: string[],
}

export const sorts: SortType[] = [{
    type: "publishtime",
    name: "Publish time",
    options: ["old - new", "new - old"],
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

const Sort = ({ navigation }: { navigation: any}): JSX.Element => {
    const routeName = navigation.state.params?.route
    const globalState = useAppSelector((state) => state)

    let sortState: SortStateType
    if (routeName === 'Main') {
        sortState = globalState.browseSort
    } else {
        sortState = globalState.mySort
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
            {sorts.map((filter) =>
                <SortRow
                    key={uuid()}
                    type={filter.type}
                    name={filter.name}
                    options={filter.options}
                    sortState={sortState}
                />
            )}
        </Container>
    )
}

export default Sort

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
