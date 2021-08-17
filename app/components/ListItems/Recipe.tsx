import React from 'react'
import { StyleSheet,  View, Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { deleteRecipe } from '../../actions/recipes'
import Recipe from '../../data/recipe'
import { ButtonFilled } from '../Buttons'
import { MyFeather } from '../Icons'




const RecipeListItem = ({
    recipe,
}: {
    recipe: Recipe
}): JSX.Element => {
    const dispatch = useDispatch()
    const theme = useSelector((state: any) => state.theme)

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
    alignSelf: center;
    alignItems: center;
    backgroundColor: ${(props) => props.theme.background};
    flex: 1;
    marginTop: 5px;
    borderWidth: 3px;
    borderColor: ${(props) => props.theme.primary};
    borderRadius: 20px;
    width: 80%;
`

const Name = styled(Text)`
    left: 5px;
    fontSize: 30px;
    color: ${(props) => props.theme.text};
`

const PropertiesContainer = styled(View)`
    flexDirection: row;
    alignItems: center;
`

const Property = styled(Text)`
    color: ${(props) => props.theme.text};
    fontSize: 20px;
    flex: 1;
`
