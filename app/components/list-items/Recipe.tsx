import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import Recipe from '../../data/recipe'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { MyFeather, MyMaterialIcons } from '../Icons'
import { DropDownMenu, DropDownItem } from '../DropdownMenu'
import { ButtonFilled } from '../user-input/Buttons'
import { deleteRecipe } from '../../actions/recipes'

const RecipeListItem = ({
    recipe,
    navigation,
}: {
    recipe: Recipe
    navigation: any
}): JSX.Element => {
    const dispatch = useAppDispatch()

    async function removeRecipe(): Promise<void> {
        dispatch(deleteRecipe(recipe))
    }

    async function editRecipe(): Promise<void> {
        console.log('Clicked Edit Recipe')
        navigation.navigate('CreateRecipe', { recipe })
    }

    const dropDownItems: DropDownItem[] = [
        {
            id: 0,
            text: 'Edit',
            onPress: editRecipe,
        },
        {
            id: 1,
            text: 'Delete',
            onPress: removeRecipe,
        },
    ]

    return (
        <Container>
            <ItemContainer>
                <Name>{recipe.name}</Name>
                <RecipeProperties recipe={recipe} />
                {/* <ButtonFilled text="Delete" onPress={removeRecipe}/> */}
                <DropDownMenu items={dropDownItems} />
            </ItemContainer>
        </Container>
    )
}

export default RecipeListItem

const RecipeProperties = ({ recipe }: { recipe: Recipe }): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)

    return (
        <PropertiesContainer>
            {/* Prepare Time */}
            <MyMaterialIcons name="timer-sand" color={theme.text} />
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
