import React from 'react'
import { View, TextInput, Dimensions } from 'react-native'
import styled from 'styled-components'
import Recipe from '../../data/recipe'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { MyFeather, MyMaterialIcons } from '../Icons'
import { DropDownMenu, DropDownItem } from '../user-input/DropdownMenu'
import { deleteRecipe } from '../../actions/recipes'

const RecipeHeader = ({
    children,
    recipe,
    navigation,
    editable,
    dropdown,
    handleNameChange,
    handleDescriptionChange,
    handlePeopleCountChange,
    handlePrepareTimeChange,
}: {
    children?: JSX.Element[]
    recipe: Recipe
    navigation: any
    editable: boolean
    dropdown?: boolean
    handleNameChange?: (text: string) => void
    handleDescriptionChange?: (text: string) => void
    handlePeopleCountChange?: (text: string) => void
    handlePrepareTimeChange?: (text: string) => void
}): JSX.Element => {
    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    async function removeRecipe(): Promise<void> {
        dispatch(deleteRecipe(recipe))
    }

    async function editRecipe(): Promise<void> {
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

    const prepareTimeStyle = (): { color: string } => {
        if (!editable || recipe.prepareTime > 0) return { color: theme.text }
        return { color: theme.grey }
    }

    const peopleCountStyle = (): { color: string } => {
        if (!editable || recipe.peopleCount > 0) return { color: theme.text }
        return { color: theme.grey }
    }

    return (
        <Header>
            {/* Dropdown Menu */}
            {dropdown ? <DropDownMenu items={dropDownItems} /> : null}

            {/* Recipe Name Input Field */}
            <RecipeNameView>
                <RecipeNameTextInput
                    editable={editable}
                    value={recipe.name}
                    placeholder="New Recipe"
                    placeholderTextColor={theme.grey}
                    onChangeText={handleNameChange}
                    multiline
                />
            </RecipeNameView>

            {/* Recipe Description Input Field */}
            {!editable && recipe.description.length === 0 ? null : (
                <DescriptionTextInput
                    editable={editable}
                    placeholder="Description"
                    value={recipe.description}
                    placeholderTextColor={theme.grey}
                    onChangeText={handleDescriptionChange}
                    multiline
                />
            )}
            <PropertiesContainer>
                {/* Prepare Time */}
                <PropertyView>
                    <MyMaterialIcons name="timer-sand" color={theme.text} />
                    <Property
                        style={prepareTimeStyle()}
                        editable={editable}
                        onChangeText={handlePrepareTimeChange}
                        value={recipe.prepareTime.toString()}
                        placeholder="0"
                        placeholderTextColor={theme.grey}
                        keyboardType="number-pad"
                    />
                </PropertyView>

                {/* People Count */}
                <PropertyView>
                    <MyFeather name="user" color={theme.text} />
                    <Property
                        style={peopleCountStyle()}
                        editable={editable}
                        onChangeText={handlePeopleCountChange}
                        value={recipe.peopleCount.toString()}
                        placeholder="0"
                        placeholderTextColor={theme.grey}
                        keyboardType="number-pad"
                    />
                </PropertyView>
            </PropertiesContainer>
            {children}
        </Header>
    )
}

export default RecipeHeader

const { height } = Dimensions.get('screen')

const Header = styled(View)`
    align-self: center;
    align-items: center;
    bottom: ${height * 0.03}px;
    width: 85%;
    background-color: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme.primary};
    border-radius: 20px;
    border-width: 3px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 5px;
`

const RecipeNameView = styled(View)`
    width: 100%;
    border-bottom-color: ${(props) => props.theme.primary};
    border-bottom-width: 1px;
`

const RecipeNameTextInput = styled(TextInput)`
    width: 90%;
    padding-bottom: 10px;
    font-size: 22px;
    color: ${(props) => props.theme.text};
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
`

const DescriptionTextInput = styled(TextInput)`
    width: 90%;
    margin-top: 8px;
    margin-left: 8px;
    margin-right: 8px;
    color: ${(props) => props.theme.text};
`

const PropertiesContainer = styled(View)`
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding-top: 5px;
`

const PropertyView = styled(View)`
    margin-left: 10px;
    align-items: center;
    justify-content: center;
    flex: 1;
    flex-direction: row;
`

const Property = styled(TextInput)`
    color: ${(props) => props.theme.text};
    font-size: 20px;
    padding-left: 5px;
    flex: 1;
`
