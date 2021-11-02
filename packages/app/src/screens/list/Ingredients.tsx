import React from 'react'
import styled from 'styled-components'
import {
    Ingredient,
    RecipeIngredient,
    RecipeIngredientUpdate,
} from '@recipes/api-types/v1'
import { Icons, View } from '@/components/base'
import { ListItemRecyclerView } from '@/components/organisms'
import { useAppSelector, useEditRecipe, useHeader, useSettings } from '@/hooks'
import { IngredientListItem } from '@/components/molecules'
import { utils } from '@/utils'
import { editRecipeActions, ingredientService } from '@/redux'

function EditIngredientsScreen({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const settings = useSettings()
    const editRecipe = useEditRecipe()
    const { theme } = settings

    useHeader(navigation, {
        right: [
            {
                type: Icons.MyFeather,
                name: 'plus',
                onPress: () => navigation.navigate('EditIngredient'),
            },
        ],
    })

    const ingredients = utils.sortPosition(editRecipe.recipeIngredients)

    const [updateIngredients] = ingredientService.useUpdateIngredientsMutation()

    const updateSlice = (ingredients: RecipeIngredient[]) => {
        return editRecipeActions.updateIngredients(ingredients)
    }

    const updateDatabase = (ingredients: RecipeIngredientUpdate[]) => {
        return updateIngredients({
            sectionId: editRecipe.sectionId,
            recipeId: editRecipe.id,
            body: ingredients,
        })
    }

    return (
        <Container backgroundColor={theme.background}>
            <ListItemRecyclerView
                Element={IngredientListItem}
                data={ingredients}
                props={{}}
                dragDrop
                updateSlice={updateSlice}
                updateDatabase={updateDatabase}
            />
        </Container>
    )
}

export default EditIngredientsScreen

const Container = styled(View)`
    flex: 1;
`
