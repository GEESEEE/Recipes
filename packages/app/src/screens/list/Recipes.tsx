import React from 'react'
import styled from 'styled-components'
import { Recipe, Section } from '@recipes/api-types/v1'
import { useRoute } from '@react-navigation/native'
import {
    useAppDispatch,
    useAppSelector,
    useHeader,
    useSearch,
    useUpdateEffect,
} from '@/hooks'
import { View, Icons } from '@/components/base'
import { recipeService } from '@/redux'
import { RecipeListItem } from '@/components/molecules'
import { ListItemRecyclerView } from '@/components/organisms'
import { applySearch } from '@/utils'

function RecipesScreen({ navigation }: { navigation: any }): JSX.Element {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings
    const dispatch = useAppDispatch()

    useHeader(navigation, {
        drawer: true,
        search: true,
        right: [
            {
                type: Icons.MyFeather,
                name: 'plus',
                onPress: () => navigation.navigate('EditRecipe'),
            },
        ],
    })

    const route = useRoute() as {
        params?: { sectionId: number }
    }
    console.log('Route', route)
    let sectionId = -1
    if (typeof route.params !== 'undefined') {
        sectionId = route.params.sectionId
    }
    const getRecipes = recipeService.useGetRecipesBySectionIdQuery(sectionId, {
        skip: sectionId < 0,
    })

    const recipes: Recipe[] = []
    const search = useSearch()
    const filteredRecipes = applySearch<Recipe>(
        recipes,
        [search],
        ['name', 'description', 'recipeIngredients.ingredient.name']
    )

    return (
        <Container backgroundColor={theme.background}>
            <ListItemRecyclerView
                Element={RecipeListItem}
                data={filteredRecipes}
                props={{}}
                loading={false}
                dragDrop
            />
        </Container>
    )
}

export default RecipesScreen

const Container = styled(View)`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`
