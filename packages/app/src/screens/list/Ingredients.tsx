import React from 'react'
import styled from 'styled-components'
import { RecipeIngredient } from '@recipes/api-types/v1'
import { Icons, View } from '@/components/base'
import { ListItemRecyclerView } from '@/components/organisms'
import {
    useEditRecipe,
    useHeader,
    useIngredientHeight,
    useSettings,
} from '@/hooks'
import { IngredientListItem } from '@/components/molecules'
import { sortPosition } from '@/utils'
import { editRecipeActions } from '@/redux'

function EditIngredientsScreen({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const settings = useSettings()
    const editRecipe = useEditRecipe()
    const { theme } = settings
    const ingredientHeight = useIngredientHeight()

    useHeader(navigation, {
        title: 'Ingredients',
        right: [
            {
                type: Icons.MyFeather,
                name: 'plus',
                onPress: () => navigation.navigate('EditIngredient'),
            },
        ],
    })

    const ingredients = sortPosition(editRecipe.recipeIngredients)

    const updateSlice = (ingredients: RecipeIngredient[]) => {
        return editRecipeActions.updateIngredients(ingredients)
    }

    return (
        <Container backgroundColor={theme.background}>
            <ListItemRecyclerView
                Element={IngredientListItem}
                data={ingredients}
                props={{ useDropdown: true }}
                dragDrop
                updateSlice={updateSlice}
                itemHeight={ingredientHeight}
            />
        </Container>
    )
}

export default EditIngredientsScreen

const Container = styled(View)`
    flex: 1;
`
