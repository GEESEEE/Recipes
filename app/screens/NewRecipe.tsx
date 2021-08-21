import React from 'react'
import { Dimensions, View, TextInput } from 'react-native'
import styled from 'styled-components'
import { createRecipe } from '../actions/recipes'
import { ButtonBorderless, ButtonFilled } from '../components/user-input/Buttons'
import {
    InstructionsList,
    IngredientsList,
} from '../components/list-items'
import { Ingredient, Recipe, Instruction, RecipeIngredient } from '../data'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { MyFeather, MyMaterialIcons } from '../components/Icons'
import { decrementIngredientId, decrementInstructionId, decrementRecipeId } from '../actions/indices'

function NewRecipeScreen({ navigation}: { navigation: any}): JSX.Element {
    const theme = useAppSelector((state) => state.theme)
    const indices = useAppSelector((state) => state.indices)
    const dispatch = useAppDispatch()

    function handleNumericTextInput(number: string): number {
        const val = parseFloat(number.replace(',', '.'))
        if (val) {
            return val
        }
        return 0
    }

    function getInitialRecipe(): Recipe {
        return {
            name: '',
            description: '',
            prepareTime: 0,
            peopleCount: 1,
            id: indices.recipeId,
            recipeIngredients: [],
            instructions: []
        }
    }

    let recipe
    if (navigation.state.params) {
        recipe = navigation.state.params.recipe
    }
    const initialState = recipe || getInitialRecipe()
    const [recipeData, setRecipeData] = React.useState<Recipe>(
        initialState
    )

    // #region State Altering Functions
    function handleNameChange(name: string): void {
        setRecipeData({ ...recipeData, name })
    }

    function handleDescriptionChange(description: string): void {
        setRecipeData({ ...recipeData, description })
    }

    function handlePrepareTimeChange(prepareTime: string): void {
        recipeData.prepareTime = handleNumericTextInput(prepareTime)
        console.log("PrepareTime:", recipeData.prepareTime)
        setRecipeData({ ...recipeData})
    }

    function handlePeopleCountChange(peopleCount: string): void {
        recipeData.peopleCount = handleNumericTextInput(peopleCount)
        console.log("PeopleCount:", recipeData.peopleCount)
        setRecipeData({ ...recipeData})
    }

    function handleAddIngredient(): void {
        const ingredient = new Ingredient(indices.ingredientId, '', '')
        const recipeIngredient = new RecipeIngredient(0, ingredient)

        recipeData.recipeIngredients?.push(recipeIngredient)
        console.log(indices.ingredientId)
        dispatch(decrementIngredientId(indices.ingredientId))
        setRecipeData({ ...recipeData })
    }

    function handleRemoveIngredient(key: string): void {
        const recipeIngredients = recipeData.recipeIngredients?.filter((item) => item.ingredient!.id.toString() !== key)
        setRecipeData({ ...recipeData, recipeIngredients})
    }

    function handleIngredientAmountChange(key: string, amount: string): void {
        const recipeIngredient = recipeData.recipeIngredients?.filter(
            (item) => item.ingredient!.id.toString() === key)[0]
        recipeIngredient!.amount = handleNumericTextInput(amount)
        setRecipeData({...recipeData})
    }

    function handleIngredientNameChange(key: string, name: string): void {
        const recipeIngredient = recipeData.recipeIngredients?.filter(
            (item) => item.ingredient!.id.toString() === key)[0]
        recipeIngredient!.ingredient!.name = name
        setRecipeData({...recipeData})
    }

    function handleIngredientUnitChange(key: string, unit: string): void {
        const recipeIngredient = recipeData.recipeIngredients?.filter(
            (item) => item.ingredient!.id.toString() === key)[0]
        recipeIngredient!.ingredient!.unit = unit
        setRecipeData({...recipeData})
    }

    function handleAddInstruction(): void {
        const instruction = new Instruction(indices.instructionId, '')
        recipeData.instructions?.push(instruction)
        console.log(indices.instructionId)
        dispatch(decrementInstructionId(indices.instructionId))
        setRecipeData({...recipeData})
    }

    function handleRemoveInstruction(key: string): void {
        const instructions = recipeData.instructions?.filter((item) => item.id.toString() !== key)
        recipeData.instructions = instructions
        setRecipeData({...recipeData})
    }

    function handleInstructionTextChange(key: string, text: string): void {
        const instruction = recipeData.instructions?.filter(
            (item) => item.id.toString() === key
        )[0]
        instruction!.text = text
        setRecipeData({...recipeData})
    }

    function cancelEditRecipe(): void {
        navigation.goBack()
    }

    function clearRecipeData(): void {
        setRecipeData(getInitialRecipe())
    }

    // #endregion

    async function handleCreateRecipe(): Promise<void> {
        dispatch(createRecipe(recipeData))
        console.log(indices.recipeId)
        dispatch(decrementRecipeId(indices.recipeId))
        clearRecipeData()
    }

    async function handleEditRecipe(): Promise<void> {
        console.log("Editing")
    }

    return (
        <Container>
            <Header>
                {/* Recipe Name Input Field */}
                <RecipeNameTextInput
                    value={recipeData.name}
                    placeholder="New Recipe"
                    placeholderTextColor={theme.grey}
                    onChangeText={(text: string) => handleNameChange(text)}
                    multiline
                />

                {/* Recipe Description Input Field */}
                <DescriptionTextInput
                    placeholder="Description"
                    value={recipeData.description}
                    placeholderTextColor={theme.grey}
                    onChangeText={(text: string) =>
                        handleDescriptionChange(text)
                    }
                    multiline
                />
                <PropertiesContainer>
                   {/* Prepare Time */}
                    <PropertyView>
                        <MyMaterialIcons name="timer-sand" color={theme.text} />
                        <Property
                            onChangeText={handlePrepareTimeChange}
                            value={recipeData.prepareTime.toString()}
                            placeholder="0"
                            placeholderTextColor={theme.grey}
                            keyboardType="number-pad"
                        />
                    </PropertyView>


                    {/* People Count */}
                    <PropertyView>
                        <MyFeather name="user" color={theme.text} />
                        <Property
                            onChangeText={handlePeopleCountChange}
                            value={recipeData.peopleCount.toString()}
                            placeholder="0"
                            placeholderTextColor={theme.grey}
                            keyboardType="number-pad"
                        />
                    </PropertyView>

                </PropertiesContainer>
            </Header>

            {/* Ingredients List Container */}
            <IngredientsList
                ingredients={recipeData.recipeIngredients!}
                handleRemoveIngredient={handleRemoveIngredient}
                handleIngredientNameChange={handleIngredientNameChange}
                handleIngredientAmountChange={handleIngredientAmountChange}
                handleIngredientUnitChange={handleIngredientUnitChange}
                handleAddIngredient={handleAddIngredient}
            />

            {/* Instructions List Container */}
            <InstructionsList
                instructions={recipeData.instructions!}
                handleRemoveInstruction={handleRemoveInstruction}
                handleInstructionTextChange={handleInstructionTextChange}
                handleAddInstruction={handleAddInstruction}
            />

            {/* Create Recipe Button */}
            <ButtonFilled
                text={recipe ? "Edit Recipe" : "Create Recipe"}
                onPress={recipe ? handleEditRecipe : handleCreateRecipe}
            />

            {/* Clear Recipe Button */}
            <ButtonBorderless
                text={recipe ? "Cancel" : "Clear Recipe"}
                onPress={recipe ? cancelEditRecipe : clearRecipeData}
            />
        </Container>
    )
}

export default NewRecipeScreen

const { height } = Dimensions.get('screen')

const Container = styled(View)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: ${(props) => props.theme.background};
`

const Header = styled(View)`
    bottom: ${height * 0.03}px;
    width: 85%;
    background-color: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme.primary};
    border-radius: 20px;
    border-width: 3px;
    padding-top: 5px;
    padding-bottom: 5px;
`

const RecipeNameTextInput = styled(TextInput)`
    margin-top: 10px;
    padding-bottom: 10px;
    font-size: 22px;
    color: ${(props) => props.theme.text};
    text-align: center;
    border-bottom-color: ${(props) => props.theme.primary};
    border-bottom-width: 1px;
`

const DescriptionTextInput = styled(TextInput)`
    margin-top: 8px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.text};
`

const PropertiesContainer = styled(View)`
    align-items: center;
    justify-content: center;
    flex-direction: row;
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
