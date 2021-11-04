import React from 'react'
import styled from 'styled-components'
import { useRoute } from '@react-navigation/native'
import { RecipeIngredient } from '@recipes/api-types/v1'
import { View, Icons } from '@/components/base'
import { useAppDispatch, useEditRecipe, useHeader, useSettings } from '@/hooks'
import { editRecipeActions } from '@/redux'
import { IngredientListItem } from '@/components/molecules'
import { getNewId, utils } from '@/utils'

function EditIngredientScreen({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const { theme } = useSettings()
    const editRecipe = useEditRecipe()
    const dispatch = useAppDispatch()

    const route = useRoute()
    const editing = Boolean(route.params)

    let ingredientId = -1
    if (route.params) {
        const params = route.params as any
        ingredientId = params.ingredientId
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

    const handleCreateIngredient = React.useCallback((): void => {
        dispatch(editRecipeActions.addIngredient(ingredientData))
    }, [dispatch, ingredientData])

    const handleEditIngredient = React.useCallback((): void => {
        dispatch(editRecipeActions.updateIngredients([ingredientData]))
    }, [dispatch, ingredientData])

    function handleNameChange(name: string) {
        const newData = {
            ...ingredientData,
            ingredient: { ...ingredientData.ingredient },
        }
        newData.ingredient.name = name
        setIngredientData(newData)
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
        const amount = utils.handleNumericTextInput(text)
        setIngredientData({ ...ingredientData, amount })
    }

    useHeader(navigation, {
        right: [
            {
                type: Icons.MyFeather,
                name: 'save',
                onPress: () => {
                    editing ? handleEditIngredient() : handleCreateIngredient()
                    navigation.pop()
                },
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
        </Container>
    )
}

export default EditIngredientScreen

const Container = styled(View)`
    flex: 1;
`
