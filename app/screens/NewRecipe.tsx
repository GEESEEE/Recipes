import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { createRecipe, editRecipe } from '../actions/recipes'
import {
    ButtonBorderless,
    ButtonFilled,
} from '../components/user-input/Buttons'
import {
    InstructionsList,
    IngredientsList,
    RecipeHeader,
} from '../components/data'
import { Ingredient, Recipe, Instruction, RecipeIngredient } from '../data'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
    decrementIngredientId,
    decrementInstructionId,
    decrementRecipeId,
} from '../actions/indices'
import { handleNumericTextInput } from '../config/utils'
import { ErrorMessage } from '../components/user-input/ErrorMessage'

type RecipeValidity = {
    validIngredients: boolean
}

function NewRecipeScreen({ navigation }: { navigation: any }): JSX.Element {
    const indices = useAppSelector((state) => state.indices)
    const dispatch = useAppDispatch()

    function getInitialRecipe(): Recipe {
        return {
            name: '',
            description: '',
            prepareTime: 0,
            peopleCount: 0,
            id: indices.recipeId,
            recipeIngredients: [],
            instructions: [],
        }
    }

    const initialValidity: RecipeValidity = {
        validIngredients: true,
    }

    const recipe = navigation.state.params?.recipe
    const initialState = recipe || getInitialRecipe()
    const [recipeData, setRecipeData] = React.useState<Recipe & RecipeValidity>(
        { ...initialState, ...initialValidity }
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
        setRecipeData({ ...recipeData })
    }

    function handlePeopleCountChange(peopleCount: string): void {
        recipeData.peopleCount = handleNumericTextInput(peopleCount, true)
        setRecipeData({ ...recipeData })
    }

    function handleAddIngredient(): void {
        const ingredient = new Ingredient(indices.ingredientId, '', '')
        const recipeIngredient = new RecipeIngredient(
            indices.ingredientId,
            0,
            recipeData.recipeIngredients!.length,
            ingredient
        )

        recipeData.recipeIngredients?.push(recipeIngredient)
        dispatch(decrementIngredientId(indices.ingredientId))
        setRecipeData({ ...recipeData })
    }

    function handleRemoveIngredient(key: string): void {
        const recipeIngredients = recipeData.recipeIngredients?.filter(
            (item) => item.id.toString() !== key
        )
        setRecipeData({ ...recipeData, recipeIngredients })
    }

    function handleIngredientAmountChange(key: string, amount: string): void {
        const recipeIngredient = recipeData.recipeIngredients?.filter(
            (item) => item.id.toString() === key
        )[0]
        recipeIngredient!.amount = handleNumericTextInput(amount)
        setRecipeData({ ...recipeData })
    }

    function handleIngredientNameChange(key: string, name: string): void {
        const recipeIngredient = recipeData.recipeIngredients?.filter(
            (item) => item.id.toString() === key
        )[0]
        recipeIngredient!.ingredient!.name = name

        let validIngredients = true
        recipeData.recipeIngredients!.forEach((ri1) => {
            const sameName = recipeData.recipeIngredients!.find(
                (ri2) =>
                    ri1.id !== ri2.id &&
                    ri1.ingredient!.name === ri2.ingredient!.name
            )
            if (sameName) {
                validIngredients = false
            }
        })

        setRecipeData({ ...recipeData, validIngredients })
    }

    function handleIngredientUnitChange(key: string, unit: string): void {
        const recipeIngredient = recipeData.recipeIngredients?.filter(
            (item) => item.id.toString() === key
        )[0]
        recipeIngredient!.ingredient!.unit = unit
        setRecipeData({ ...recipeData })
    }

    function handleAddInstruction(): void {
        const instruction = new Instruction(indices.instructionId, '', recipeData.instructions!.length)
        recipeData.instructions?.push(instruction)
        dispatch(decrementInstructionId(indices.instructionId))
        setRecipeData({ ...recipeData })
    }

    function handleRemoveInstruction(key: string): void {
        const instructions = recipeData.instructions?.filter(
            (item) => item.id.toString() !== key
        )
        recipeData.instructions = instructions
        setRecipeData({ ...recipeData })
    }

    function handleInstructionTextChange(key: string, text: string): void {
        const instruction = recipeData.instructions?.filter(
            (item) => item.id.toString() === key
        )[0]
        instruction!.text = text
        setRecipeData({ ...recipeData })
    }

    // #endregion

    function validRecipe(): boolean {
        return recipeData.validIngredients
    }

    async function handleCreateRecipe(): Promise<void> {
        if (validRecipe()) {
            dispatch(createRecipe(recipeData))
            dispatch(decrementRecipeId(indices.recipeId))
            clearRecipeData()
            navigation.navigate('RecipesScreen')
        }
    }

    function clearRecipeData(): void {
        setRecipeData({ ...getInitialRecipe(), ...initialValidity })
    }

    async function handleEditRecipe(): Promise<void> {
        console.log("Editing")
        if (validRecipe()) {
            dispatch(editRecipe(recipeData))
        }
    }

    function cancelEditRecipe(): void {
        navigation.navigate('RecipesScreen')
    }

    return (
        <Container>
            <RecipeHeader
                recipe={recipeData}
                navigation={navigation}
                editable
                handleNameChange={handleNameChange}
                handleDescriptionChange={handleDescriptionChange}
                handlePeopleCountChange={handlePeopleCountChange}
                handlePrepareTimeChange={handlePrepareTimeChange}
            />

            {/* Ingredients List Container */}
            <IngredientsList
                ingredients={recipeData.recipeIngredients!}
                handleRemoveIngredient={handleRemoveIngredient}
                handleIngredientNameChange={handleIngredientNameChange}
                handleIngredientAmountChange={handleIngredientAmountChange}
                handleIngredientUnitChange={handleIngredientUnitChange}
                handleAddIngredient={handleAddIngredient}
            />
            <ErrorMessage
                errorMessage={
                    recipeData.validIngredients
                        ? undefined
                        : 'Can not use 2 ingredients with the same name'
                }
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
                text={recipe ? 'Save' : 'Create Recipe'}
                onPress={recipe ? handleEditRecipe : handleCreateRecipe}
            />

            {/* Clear Recipe Button */}
            <ButtonBorderless
                text={recipe ? 'Cancel' : 'Clear Recipe'}
                onPress={recipe ? cancelEditRecipe : clearRecipeData}
            />
        </Container>
    )
}

export default NewRecipeScreen

const Container = styled(View)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: ${(props) => props.theme.background};
`
