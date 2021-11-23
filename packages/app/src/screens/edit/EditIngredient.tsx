import React from 'react'
import styled from 'styled-components'
import { useRoute } from '@react-navigation/native'
import { RecipeIngredient } from '@recipes/api-types/v1'
import { Icons, KeyboardContainer } from '@/components/base'
import { Error } from '@/components/atoms'
import {
    useAppDispatch,
    useEditRecipe,
    useHeader,
    useSettings,
    useToggle,
} from '@/hooks'
import { editRecipeActions } from '@/redux'
import { IngredientListItem } from '@/components/molecules'
import { getNewId, handleNumericTextInput } from '@/utils'

function EditIngredientScreen({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const { theme } = useSettings()
    const editRecipe = useEditRecipe()
    const dispatch = useAppDispatch()

    const route = useRoute() as {
        params?: { ingredientId: number }
    }
    const editing = Boolean(route.params)

    let ingredientId = -1
    if (typeof route.params !== 'undefined') {
        ingredientId = route.params.ingredientId
    }

    let ingredient = editRecipe.recipeIngredients.find(
        (ingredient) => ingredient.id === ingredientId
    )

    if (typeof ingredient === 'undefined') {
        ingredient = new RecipeIngredient(
            getNewId(editRecipe.recipeIngredients)
        )
    }

    const [ingredientData, setIngredientData] =
        React.useState<RecipeIngredient>(ingredient)
    const [valid, setValid] = useToggle(true)

    const handleCreateIngredient = React.useCallback((): void => {
        dispatch(editRecipeActions.addIngredient(ingredientData))
    }, [dispatch, ingredientData])

    const handleEditIngredient = React.useCallback((): void => {
        dispatch(editRecipeActions.updateIngredients([ingredientData]))
    }, [dispatch, ingredientData])

    function checkValidity(name: string): void {
        let validIngredients = true
        editRecipe.recipeIngredients.forEach((ingr) => {
            if (ingr.ingredient.name === name) {
                validIngredients = false
            }
        })
        setValid(validIngredients)
    }

    function handleNameChange(name: string) {
        const newData = {
            ...ingredientData,
            ingredient: { ...ingredientData.ingredient },
        }
        newData.ingredient.name = name
        setIngredientData(newData)
        checkValidity(name)
    }

    function handleUnitChange(unit: string) {
        const newData = {
            ...ingredientData,
            ingredient: { ...ingredientData.ingredient },
        }
        newData.ingredient.unit = unit
        setIngredientData(newData)
    }

    function handleAmountChange(text: string) {
        const amount = handleNumericTextInput(text)
        setIngredientData({ ...ingredientData, amount })
    }

    function onPress(): void {
        if (valid) {
            editing ? handleEditIngredient() : handleCreateIngredient()
            navigation.pop()
        }
    }

    useHeader(navigation, {
        title: editing ? 'Edit Ingredient' : 'Create Ingredient',
        right: [
            {
                type: Icons.MyFeather,
                name: 'save',
                onPress,
                disabled: !valid,
            },
        ],
    })

    return (
        <Container backgroundColor={theme.background}>
            <IngredientListItem
                item={ingredientData}
                editable
                handleIngredientNameChange={handleNameChange}
                handleIngredientUnitChange={handleUnitChange}
                handleIngredientAmountChange={handleAmountChange}
            />
            <Error
                message={
                    valid
                        ? undefined
                        : 'Ingredient with that name already exists'
                }
            />
        </Container>
    )
}

export default EditIngredientScreen

const Container = styled(KeyboardContainer)`
    flex: 1;
`
