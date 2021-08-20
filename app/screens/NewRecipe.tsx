import React from 'react'
import { Dimensions, View } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { createRecipe } from '../actions/recipes'
import {HeaderBordered} from '../components/HeaderBordered'
import { ButtonBorderless, ButtonFilled } from '../components/user-input/Buttons'
import {
    InstructionListItem,
    IngredientListItem,
} from '../components/list-items'
import { Ingredient, Recipe, Instruction, RecipeIngredient } from '../data'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

function NewRecipeScreen(): JSX.Element {
    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    function getInitialRecipe(): Recipe {
        return {
            name: '',
            description: '',
            prepareTime: 0,
            peopleCount: 1,
            key: uuid(),
            id: 0,
            recipeIngredients: [],
            instructions: [],
        }
    }

    const [recipeData, setRecipeData] = React.useState<Recipe>(
        getInitialRecipe()
    )

    function handleNameChange(name: string): void {
        setRecipeData({ ...recipeData, name })
    }

    function handleDescriptionChange(description: string): void {
        setRecipeData({ ...recipeData, description })
    }

    function handlePrepareTimeChange(prepareTime: number): void {
        setRecipeData({ ...recipeData, prepareTime })
    }

    function handlePeopleCountChange(peopleCount: number): void {
        setRecipeData({ ...recipeData, peopleCount })
    }

    function handleAddIngredient(): void {
        const ingredient = new Ingredient()
        ingredient.name = ''
        ingredient.unit = ''

        const recipeIngredient = new RecipeIngredient()
        recipeIngredient.amount = 0
        recipeIngredient.key = uuid()
        recipeIngredient.ingredient = ingredient

        recipeData.recipeIngredients?.push(recipeIngredient)
        setRecipeData({ ...recipeData })
    }

    function handleRemoveIngredient(key: string): void {
        const recipeIngredients = recipeData.recipeIngredients?.filter((item) => item.key !== key)
        setRecipeData({ ...recipeData, recipeIngredients})
    }

    function handleIngredientNameChange(key: string, name: string): void {
        const recipeIngredient = recipeData.recipeIngredients?.filter((item) => item.key === key)[0]
        recipeIngredient!.ingredient!.name = name
        setRecipeData({...recipeData})
    }

    function handleIngredientUnitChange(key: string, unit: string): void {
        const recipeIngredient = recipeData.recipeIngredients?.filter((item) => item.key === key)[0]
        recipeIngredient!.ingredient!.unit = unit
        setRecipeData({...recipeData})
    }

    function handleIngredientAmountChange(key: string, amount: string): void {
        const recipeIngredient = recipeData.recipeIngredients?.filter((item) => item.key === key)[0]
        const val = parseFloat(amount.replace(',', '.'))
        if (val) {
            recipeIngredient!.amount = val
        } else {
            recipeIngredient!.amount = 0
        }
        setRecipeData({...recipeData})
    }

    function handleAddInstruction(): void {
        const instruction = new Instruction()
        instruction.text = ''
        instruction.key = uuid()
        recipeData.instructions?.push(instruction)
        setRecipeData({...recipeData})
    }

    function handleRemoveInstruction(key: string): void {
        const instructions = recipeData.instructions?.filter((item) => item.key !== key)
        recipeData.instructions = instructions
        setRecipeData({...recipeData})
    }

    function handleInstructionTextChange(key: string, text: string): void {
        const instruction = recipeData.instructions?.filter(
            (item) => item.key === key
        )[0]
        instruction!.text = text
        setRecipeData({...recipeData})
    }

    async function handleCreateRecipe(): Promise<void> {
        dispatch(createRecipe(recipeData))
        clearRecipeData()
    }

    function clearRecipeData(): void {
        setRecipeData(getInitialRecipe())
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
            </Header>

            {/* Ingredients List Container */}
            <HeaderBordered headerText="Ingredients">
                <List
                    data={recipeData.recipeIngredients}
                    renderItem={({ item}) => (
                        <IngredientListItem
                            item={item}
                            onRemove={handleRemoveIngredient}
                            onChangeName={handleIngredientNameChange}
                            onChangeAmount={handleIngredientAmountChange}
                            onChangeUnit={handleIngredientUnitChange}
                        />
                    )}
                />
                <ButtonBorderless text="Add Ingredient" onPress={handleAddIngredient} />
            </HeaderBordered>

            {/* Instructions List Container */}
            <HeaderBordered headerText="Instructions">
                <List
                    data={recipeData.instructions}
                    renderItem={({ item }) => (
                        <InstructionListItem
                            number={(recipeData.instructions!.indexOf(item) + 1).toString()}
                            item={item as Instruction}
                            onRemove={handleRemoveInstruction}
                            onChangeText={handleInstructionTextChange}
                        />
                    )}
                />
                <ButtonBorderless  text="Add Instruction" onPress={handleAddInstruction} />
            </HeaderBordered>

            {/* Create Recipe Button */}
            <ButtonFilled text="Create Recipe" onPress={handleCreateRecipe} />

            {/* Clear Recipe Button */}
            <ButtonBorderless text="Clear Recipe" onPress={clearRecipeData} />
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
    font-size: 25px;
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

const List = styled(FlatList)`
    padding-top: 5px;
    flex-direction: column;
`
