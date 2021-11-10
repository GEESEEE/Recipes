import React from 'react'
import styled from 'styled-components'
import { useRoute } from '@react-navigation/native'
import { Recipe } from '@recipes/api-types/v1'
import {
    useAppDispatch,
    useEditRecipe,
    useHeader,
    useRecipes,
    useSections,
    useSettings,
    useToggle,
} from '@/hooks'
import { View, Text, Icons } from '@/components/base'
import { TextInputWithTitle, Counter } from '@/components/atoms'
import { ConfirmationModal, Picker } from '@/components/molecules'
import {
    editRecipeActions,
    ingredientService,
    instructionService,
    recipesActions,
    recipeService,
} from '@/redux'
import {
    getListItemChanges,
    getNewListItems,
    getNewPosition,
    ingredientCreateObjects,
    ingredientUpdateObject,
    instructionCreateObjects,
    instructionUpdateObject,
    recipeCreateObject,
    recipeUpdateObject,
} from '@/utils'
import { handleNumericTextInput, sortPosition } from '@/utils/utils'

const emptyRecipe = new Recipe()
emptyRecipe.instructions = []
emptyRecipe.recipeIngredients = []

function EditRecipeScreen({ navigation }: { navigation: any }): JSX.Element {
    const { theme } = useSettings()
    const editRecipe = useEditRecipe()
    const recipes = useRecipes()
    const sections = useSections()
    const dispatch = useAppDispatch()

    const route = useRoute() as {
        params?: { sectionId: number; recipeId: number }
    }

    let sectionId = -1
    let recipeId = -1
    if (typeof route.params !== 'undefined') {
        recipeId = route.params.recipeId
        sectionId = route.params.sectionId
    }

    let passedRecipe: Recipe | undefined
    const sectionRecipes = recipes[sectionId]
    if (typeof sectionRecipes !== 'undefined') {
        passedRecipe = sectionRecipes.find((recipe) => recipe.id === recipeId)
    }

    React.useEffect(() => {
        dispatch(
            editRecipeActions.setRecipe(
                passedRecipe || { ...emptyRecipe, sectionId }
            )
        )
    }, [dispatch, passedRecipe, sectionId])

    const editing = typeof passedRecipe !== 'undefined'

    const prepareTimeHours = Math.floor(editRecipe.prepareTime / 60)
    const prepareTimeMinutes = editRecipe.prepareTime - prepareTimeHours * 60

    function handlePrepareTimeHours(text: string): void {
        const hours = handleNumericTextInput(text, true)
        const newTime = hours * 60 + prepareTimeMinutes
        dispatch(editRecipeActions.setPrepareTime(newTime))
    }

    function handlePrepareTimeMinutes(text: string): void {
        const minutes = handleNumericTextInput(text, true)
        const newTime = prepareTimeHours * 60 + minutes
        dispatch(editRecipeActions.setPrepareTime(newTime))
    }

    function incrementPeopleCount(): void {
        dispatch(editRecipeActions.setPeopleCount(editRecipe.peopleCount + 1))
    }

    function decrementPeopleCount(): void {
        dispatch(editRecipeActions.setPeopleCount(editRecipe.peopleCount - 1))
    }

    // Recipe Creation in database
    const [createRecipes, createRecipesState] =
        recipeService.useCreateRecipesMutation()
    const [addIngredients, addIngredientsState] =
        ingredientService.useAddIngredientsMutation()
    const [addInstructions, addInstructionsState] =
        instructionService.useAddInstructionsMutation()

    const createLoading =
        createRecipesState.isLoading ||
        addInstructionsState.isLoading ||
        addIngredientsState.isLoading

    const handleCreateRecipe = React.useCallback(async (): Promise<void> => {
        const newRecipe = recipeCreateObject(editRecipe)
        newRecipe.position = getNewPosition(sectionRecipes || [])

        const recipeResult = await createRecipes({
            sectionId: editRecipe.sectionId,
            body: [newRecipe],
        })

        if ('data' in recipeResult) {
            const newRecipe = recipeResult.data[0]
            const recipe: Recipe = {
                ...newRecipe,
                instructions: [],
                recipeIngredients: [],
            }
            const baseCreateObj = {
                sectionId: editRecipe.sectionId,
                recipeId: recipe.id,
            }

            if (editRecipe.recipeIngredients.length > 0) {
                const ingredients = await addIngredients({
                    ...baseCreateObj,
                    body: ingredientCreateObjects(editRecipe.recipeIngredients),
                })
                if ('data' in ingredients) {
                    recipe.recipeIngredients = sortPosition(ingredients.data)
                }
            }

            if (editRecipe.instructions.length > 0) {
                const instructions = await addInstructions({
                    ...baseCreateObj,
                    body: instructionCreateObjects(editRecipe.instructions),
                })
                if ('data' in instructions) {
                    recipe.instructions = sortPosition(instructions.data)
                }
            }
            dispatch(recipesActions.addRecipe({ sectionId, recipe }))
            navigation.pop()
        }
    }, [
        addIngredients,
        addInstructions,
        createRecipes,
        dispatch,
        editRecipe,
        navigation,
        sectionId,
        sectionRecipes,
    ])

    // Recipe update in database
    const [updateRecipes, updateRecipesState] =
        recipeService.useUpdateRecipesMutation()
    const [updateIngredients, updateIngredientsState] =
        ingredientService.useUpdateIngredientsMutation()
    const [deleteIngredients, deleteIngredientsState] =
        ingredientService.useDeleteIngredientsMutation()
    const [updateInstructions, updateInstructionsState] =
        instructionService.useUpdateInstructionsMutation()
    const [deleteInstructions, deleteInstructionsState] =
        instructionService.useDeleteInstructionsMutation()

    const updateLoading =
        updateRecipesState.isLoading ||
        addInstructionsState.isLoading ||
        updateIngredientsState.isLoading ||
        deleteIngredientsState.isLoading ||
        addInstructionsState.isLoading ||
        updateInstructionsState.isLoading ||
        deleteInstructionsState.isLoading

    const handleEditRecipe = React.useCallback(async (): Promise<void> => {
        const oldRecipe = passedRecipe as Recipe
        const recipeUpdate = recipeUpdateObject(oldRecipe as Recipe, editRecipe)

        let updatedRecipe = oldRecipe
        if (Object.keys(recipeUpdate).length > 1) {
            const recipe = await updateRecipes({
                sectionId,
                body: [recipeUpdate],
            })
            if ('data' in recipe) {
                updatedRecipe = recipe.data[0]
            }
        }

        const baseArgs = {
            sectionId: editRecipe.sectionId,
            recipeId: oldRecipe.id,
        }

        const [unchangedIngrs, ...ingrChanges] = getListItemChanges(
            oldRecipe.recipeIngredients,
            editRecipe.recipeIngredients,
            ingredientCreateObjects,
            ingredientUpdateObject
        )
        const newIngredients = await getNewListItems(
            baseArgs,
            ingrChanges,
            addIngredients,
            updateIngredients,
            deleteIngredients
        )

        const [unchangedInstrs, ...instructionChanges] = getListItemChanges(
            oldRecipe.instructions,
            editRecipe.instructions,
            instructionCreateObjects,
            instructionUpdateObject
        )
        const newInstructions = await getNewListItems(
            baseArgs,
            instructionChanges,
            addInstructions,
            updateInstructions,
            deleteInstructions
        )

        const finalRecipe = {
            ...updatedRecipe,
            recipeIngredients: sortPosition([
                ...unchangedIngrs,
                ...newIngredients,
            ]),
            instructions: sortPosition([
                ...unchangedInstrs,
                ...newInstructions,
            ]),
        }

        navigation.pop()
        if (sectionId !== editRecipe.sectionId) {
            dispatch(
                recipesActions.removeRecipe({
                    sectionId,
                    recipeId: finalRecipe.id,
                })
            )
            dispatch(
                recipesActions.addRecipe({
                    sectionId: finalRecipe.sectionId,
                    recipe: finalRecipe,
                })
            )
        } else {
            dispatch(
                recipesActions.updateRecipes({
                    sectionId,
                    recipes: [finalRecipe],
                })
            )
        }
    }, [
        passedRecipe,
        editRecipe,
        sectionId,
        addIngredients,
        updateIngredients,
        deleteIngredients,
        addInstructions,
        updateInstructions,
        deleteInstructions,
        dispatch,
        navigation,
        updateRecipes,
    ])

    const [showConfirmation, toggleConfirmation] = useToggle(false)

    function goBack(): void {
        toggleConfirmation(true)
    }

    useHeader(navigation, {
        return: goBack,
        title: editing ? 'Edit Recipe' : 'Create Recipe',
        right: [
            {
                type: Icons.MyFeather,
                name: 'save',
                onPress: () => {
                    editing ? handleEditRecipe() : handleCreateRecipe()
                },
                loading: createLoading || updateLoading,
            },
        ],
    })

    const width = 'l'
    const paddingHorizontal = 'm'
    const marginVertical = 's'

    const prepareTimeText = 'Prepare time'
    const peopleCountText = 'People count'
    const sectionText = 'Section'

    const [newSectionId, setSectionId] = React.useState<number>(sectionId)

    function handleChangeSection(id: number) {
        setSectionId(id)
        dispatch(editRecipeActions.setSectionId(id))
    }

    const sectionDropdownItems = sections.map((section) => ({
        id: section.id,
        text: section.name,
        onPress: () => handleChangeSection(section.id),
    }))

    return (
        <Container backgroundColor={theme.background} paddingVertical="s">
            {showConfirmation ? (
                <ConfirmationModal
                    title="Are you sure you want to stop editing this recipe?"
                    message="All changes will be lost"
                    onConfirm={() => {
                        navigation.goBack()
                        toggleConfirmation(false)
                    }}
                    onCancel={() => toggleConfirmation(false)}
                />
            ) : null}
            <TextInputWithTitle
                title="Title"
                type="SubHeader"
                onChangeText={(t: string) =>
                    dispatch(editRecipeActions.setName(t))
                }
                multiline
                value={editRecipe.name}
            />

            <TextInputWithTitle
                title="Description"
                onChangeText={(t: string) =>
                    dispatch(editRecipeActions.setDescription(t))
                }
                multiline
                value={editRecipe.description}
            />

            <RowContainer
                width={width}
                paddingHorizontal={paddingHorizontal}
                marginVertical={marginVertical}
            >
                <FlexText>{prepareTimeText}</FlexText>
                <TextInputWithTitle
                    value={prepareTimeHours.toString()}
                    marginHorizontal="s"
                    title="Hours"
                    onChangeText={(t: string) => handlePrepareTimeHours(t)}
                    width="s"
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TextInputWithTitle
                    value={prepareTimeMinutes.toString()}
                    title="Minutes"
                    onChangeText={(t: string) => handlePrepareTimeMinutes(t)}
                    width="s"
                    keyboardType="numeric"
                    maxLength={2}
                />
            </RowContainer>

            <RowContainer
                width={width}
                paddingHorizontal={paddingHorizontal}
                marginVertical={marginVertical}
            >
                <FlexText>{peopleCountText}</FlexText>
                <Counter
                    width="s"
                    marginHorizontal="s"
                    increment={incrementPeopleCount}
                    decrement={decrementPeopleCount}
                    value={editRecipe.peopleCount}
                />
                <View width="s" />
            </RowContainer>

            <RowContainer
                width={width}
                paddingHorizontal={paddingHorizontal}
                marginVertical={marginVertical}
            >
                <FlexText>{sectionText}</FlexText>
                <Picker
                    width="m"
                    marginHorizontal="s"
                    items={sectionDropdownItems}
                    current={
                        sections.find((s) => s.id === newSectionId)?.name || ''
                    }
                    original={
                        sections.find((s) => s.id === sectionId)?.name || ''
                    }
                />
            </RowContainer>
        </Container>
    )
}

export default EditRecipeScreen

const Container = styled(View)`
    flex: 1;
    align-items: center;
`

const RowContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`

const FlexText = styled(Text)`
    flex: 1;
`
