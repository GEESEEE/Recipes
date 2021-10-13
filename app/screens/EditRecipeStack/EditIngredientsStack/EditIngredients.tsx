import React from 'react'
import styled from 'styled-components'
import { View } from '@/components/base'
import { IngredientsRecyclerListView } from '@/components/organisms'
import { useAppSelector } from '@/hooks'
import { Ingredient, RecipeIngredient } from '@/data'


function EditIngredientsScreen(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)

    const ingredients: RecipeIngredient[] = []
    const instrs = [0, 1, 2, 3, 4]
    instrs.forEach((i) => {
        const ingredient = new Ingredient(i, `Ingredient ${i}`, 'g')
        const recipeIngredient = new RecipeIngredient(i, i * 10, i, ingredient)
        ingredients.push(recipeIngredient)
    })

    return (
        <Container
            backgroundColor={theme.background}
        >
            <IngredientsRecyclerListView
                ingredients={ingredients}
            />
        </Container>
    )
}

export default EditIngredientsScreen

const Container = styled(View)`
    flex: 1;
`
