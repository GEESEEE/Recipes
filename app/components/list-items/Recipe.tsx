import React from 'react'
import { View, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components'
import Recipe from '../../data/recipe'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { MyFeather } from '../Icons'
import { DropDownMenu, DropDownItem } from '../DropdownMenu'


const RecipeListItem = ({ recipe }: { recipe: Recipe }): JSX.Element => {
    const dispatch = useAppDispatch()

    async function removeRecipe(): Promise<void> {
        console.log("Deleting recipe")
        // dispatch(deleteRecipe(recipe))
    }

    async function editRecipe(): Promise<void> {
        console.log('Clicked Edit Recipe')
    }

    const dropDownItems: DropDownItem[] = [{
        id: 0,
        text: 'Edit',
        onPress: editRecipe,
    }, {
        id: 1,
        text: 'Delete',
        onPress: removeRecipe,
    }, ]

    return (
        <Container>
            <ItemContainer>
                <Name>{recipe.name}</Name>
                <Properties recipe={recipe}/>
                <DropDownMenu items={dropDownItems} />
            </ItemContainer>
        </Container>
    )
}

export default RecipeListItem

const Properties = ({ recipe }: {recipe: Recipe}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)

    return (
        <PropertiesContainer>
                {/* Prepare Time */}
                <MaterialCommunityIcons
                    name="timer-sand"
                    size={20}
                    color={theme.text}
                />
                <Property>{recipe.prepareTime}</Property>

                {/* People Count */}
                <MyFeather name="user" color={theme.text} />
                <Property>{recipe.peopleCount}</Property>
            </PropertiesContainer>
    )
}

const Container = styled(View)`
   flex: 1;
`

const ItemContainer = styled(View)`
    align-self: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
    margin-top: 5px;
    border-width: 2px;
    border-color: ${(props) => props.theme.primary};
    width: 90%;
    border-radius: 15px;
`

const Name = styled(Text)`
    margin-start: 15px;
    margin-end: 15px;
    font-size: 20px;
    color: ${(props) => props.theme.text};
`

const PropertiesContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`

const Property = styled(Text)`
    color: ${(props) => props.theme.text};
    font-size: 20px;
    flex: 1;
`


