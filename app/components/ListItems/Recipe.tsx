import React from 'react'
import { View, Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components'
import { deleteRecipe } from '../../actions/recipes'
import Recipe from '../../data/recipe'
import { useAppDispatch, useAppSelector } from '../../types/ReduxHooks'
import { ButtonFilled } from '../Buttons'
import { MyFeather } from '../Icons'

const RecipeListItem = ({
    recipe,
}: {
    recipe: Recipe
}): JSX.Element => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.theme)

    async function removeRecipe(): Promise<void> {
        dispatch(deleteRecipe(recipe))
    }

    return (
        <Container>
            {/* Recipe Name */}
            <Name>{recipe.name}</Name>

            {/* Recipe Properties */}
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

            <ButtonFilled
                text="Delete Recipe"
                onPress={removeRecipe}
            />

        </Container>
    )
}

export default RecipeListItem

const Container = styled(View)`
    align-self: center;
    align-items: center;
    background-color: ${(props) => props.theme.background};
    flex: 1;
    margin-top: 5px;
    border-width: 3px;
    border-color: ${(props) => props.theme.primary};
    border-radius: 20px;
    width: 80%;
`

const Name = styled(Text)`
    left: 5px;
    font-size: 30px;
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
