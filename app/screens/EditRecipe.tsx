import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import _ from 'lodash'
import { useRoute } from '@react-navigation/native'
import {
    ButtonBorderless,
    ButtonFilled,
} from '@/components/user-input/Buttons'
import { Ingredient, Recipe, Instruction, RecipeIngredient } from '@/data'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { indicesActions, myRecipeActions } from '@/redux/actions'
import { RecipeSectionList } from '@/components/data'
import { routeUtils, utils } from '@/config'

type RecipeValidity = {
    validIngredients: boolean
}

function EditRecipeScreen({ navigation }: { navigation: any }): JSX.Element {
    const { indices, myRecipes, auth } = useAppSelector((state) => state)
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
            publishedAt: null,
            createdAt: new Date(),
            copyOf: null,
            authorId: auth.user.id,
        }
    }

    const initialValidity: RecipeValidity = {
        validIngredients: true,
    }

    let passedRecipe
    const { params } = useRoute()
    if (typeof params !== 'undefined') {
        const { recipe } = params as { recipe: Recipe }
        passedRecipe = recipe
    }

    const initialState = passedRecipe || getInitialRecipe()
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
        recipeData.prepareTime = utils.handleNumericTextInput(prepareTime)
        setRecipeData({ ...recipeData })
    }

    function handlePeopleCountChange(peopleCount: string): void {
        recipeData.peopleCount = utils.handleNumericTextInput(peopleCount, true)
        setRecipeData({ ...recipeData })
    }

    function recipeComplete(): boolean {
        return (
            recipeData.name.length > 0 &&
            recipeData.description.length > 0 &&
            recipeData.prepareTime > 0 &&
            recipeData.peopleCount > 0 &&
            recipeData.recipeIngredients!.length > 0 &&
            recipeData.instructions!.length > 0
        )
    }

    function handlePublishedAtChange(): void {
        if (recipeData.publishedAt === null) {
            if (recipeComplete()) {
                recipeData.publishedAt = new Date()
            } else {
                routeUtils.showPopup(
                    navigation,
                    'Incomplete Recipe',
                    'Can not publish an incomplete recipe'
                )
            }
        } else {
            recipeData.publishedAt = null
        }
        setRecipeData({ ...recipeData })
    }

    function handleAddIngredient(): void {
        const ingredient = new Ingredient(indices.ingredientId, '', '')
        const ri = _.maxBy(recipeData.recipeIngredients!, 'position')
        const recipeIngredient = new RecipeIngredient(
            indices.ingredientId,
            0,
            ri ? ri.position + 1 : 0,
            ingredient
        )

        recipeData.recipeIngredients?.push(recipeIngredient)
        dispatch(indicesActions.decrementIngredientId(indices.ingredientId))
        setRecipeData({ ...recipeData })
    }

    function handleRemoveIngredient(key: string): void {
        const recipeIngredients = recipeData.recipeIngredients?.filter(
            (item) => item.id.toString() !== key
        )
        setRecipeData({ ...recipeData, recipeIngredients })
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

    function handleIngredientAmountChange(key: string, amount: string): void {
        if (amount.length > 5) return
        const recipeIngredient = recipeData.recipeIngredients?.filter(
            (item) => item.id.toString() === key
        )[0]
        recipeIngredient!.amount = utils.handleNumericTextInput(amount)
        setRecipeData({ ...recipeData })
    }

    function handleIngredientUnitChange(key: string, unit: string): void {
        if (unit.length > 8) return
        const recipeIngredient = recipeData.recipeIngredients?.filter(
            (item) => item.id.toString() === key
        )[0]
        recipeIngredient!.ingredient!.unit = unit
        setRecipeData({ ...recipeData })
    }

    function handleAddInstruction(): void {
        const i = _.maxBy(recipeData.instructions!, 'position')
        const instruction = new Instruction(
            indices.instructionId,
            '',
            i ? i.position + 1 : 0
        )
        recipeData.instructions?.push(instruction)
        dispatch(indicesActions.decrementInstructionId(indices.instructionId))
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
            recipeData.createdAt = new Date()
            await dispatch(myRecipeActions.createRecipe(recipeData, navigation))
            dispatch(indicesActions.decrementRecipeId(indices.recipeId))
            clearRecipeData()
        }
    }

    function clearRecipeData(): void {
        setRecipeData({ ...getInitialRecipe(), ...initialValidity })
    }

    async function handleEditRecipe(): Promise<void> {
        if (validRecipe()) {
            dispatch(myRecipeActions.editRecipe(recipeData, navigation))
            passedRecipe = recipeData
        }
    }

    function cancelEditRecipe(): void {
        navigation.goBack()
    }

    return (
        <Container>
            <RecipeSectionList
                recipe={recipeData}
                action="Create"
                handleNameChange={(text: string) => handleNameChange(text)}
                handleDescriptionChange={(text: string) =>
                    handleDescriptionChange(text)
                }
                handlePeopleCountChange={(text: string) =>
                    handlePeopleCountChange(text)
                }
                handlePrepareTimeChange={(text: string) =>
                    handlePrepareTimeChange(text)
                }
                handlePublishedAtChange={() => handlePublishedAtChange()}
                handleRemoveIngredient={(key: string) =>
                    handleRemoveIngredient(key)
                }
                handleIngredientNameChange={(key: string, text: string) =>
                    handleIngredientNameChange(key, text)
                }
                handleIngredientAmountChange={(key: string, text: string) =>
                    handleIngredientAmountChange(key, text)
                }
                handleIngredientUnitChange={(key: string, text: string) =>
                    handleIngredientUnitChange(key, text)
                }
                handleAddIngredient={() => handleAddIngredient()}
                ingredientError={
                    recipeData.validIngredients
                        ? undefined
                        : 'Invalid Ingredients'
                }
                handleRemoveInstruction={(key: string) =>
                    handleRemoveInstruction(key)
                }
                handleInstructionTextChange={(key: string, text: string) =>
                    handleInstructionTextChange(key, text)
                }
                handleAddInstruction={() => handleAddInstruction()}
                FooterComponent={
                    <FooterView>
                        <ButtonFilled
                            text={passedRecipe ? 'Save' : 'Create Recipe'}
                            onPress={
                                passedRecipe
                                    ? handleEditRecipe
                                    : handleCreateRecipe
                            }
                            loading={myRecipes.loading}
                        />

                        <ButtonBorderless
                            text={passedRecipe ? 'Cancel' : 'Clear Recipe'}
                            onPress={
                                passedRecipe
                                    ? cancelEditRecipe
                                    : clearRecipeData
                            }
                        />
                    </FooterView>
                }
            />
        </Container>
    )
}

export default EditRecipeScreen

const Container = styled(View)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: ${(props) => props.theme.background};
`

const FooterView = styled(View)`
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
