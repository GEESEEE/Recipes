import React from 'react'
import styled from 'styled-components'
import { Recipe, RecipeUpdate } from '@recipes/api-types/v1'
import { useRoute } from '@react-navigation/native'
import {
    useAppDispatch,
    useAppSelector,
    useAuth,
    useHeader,
    useRecipes,
    useSearch,
    useSettings,
    useUpdateEffect,
} from '@/hooks'
import { View, Icons } from '@/components/base'
import { recipesActions, recipeService } from '@/redux'
import { RecipeListItem } from '@/components/molecules'
import { ListItemRecyclerView } from '@/components/organisms'
import { applySearch, utils } from '@/utils'

function RecipesScreen({ navigation }: { navigation: any }): JSX.Element {
    const settings = useSettings()
    const auth = useAuth()
    const recipes = useRecipes()
    const { theme } = settings
    const dispatch = useAppDispatch()

    const route = useRoute() as {
        params?: { sectionId: number }
    }
    let sectionId = -1
    if (typeof route.params !== 'undefined') {
        sectionId = route.params.sectionId
    }

    async function setRecipes(
        sectionId: number,
        recipes: Recipe[]
    ): Promise<void> {
        await dispatch(recipesActions.setRecipes({ sectionId, recipes }))
    }

    const skip =
        sectionId < 0 ||
        typeof recipes[sectionId] !== 'undefined' ||
        auth.token.length <= 0

    const getRecipes = recipeService.useGetRecipesBySectionIdQuery(sectionId, {
        skip,
    })

    useUpdateEffect(() => {
        if (typeof getRecipes.data !== 'undefined') {
            setRecipes(sectionId, getRecipes.data)
        }
    }, [getRecipes.data])

    const [updateRecipes] = recipeService.useUpdateRecipesMutation()

    const sectionRecipes =
        typeof recipes[sectionId] === 'undefined'
            ? []
            : utils.sortPosition(recipes[sectionId])

    const search = useSearch()
    const filteredRecipes = applySearch<Recipe>(
        sectionRecipes,
        [search],
        ['name', 'description', 'recipeIngredients.ingredient.name']
    )

    function updateSlice(recipes: Recipe[]) {
        return recipesActions.updateRecipes({ sectionId, recipes })
    }

    function updateDatabase(recipes: RecipeUpdate[]) {
        return updateRecipes({ sectionId, body: recipes })
    }

    useHeader(navigation, {
        drawer: false,
        search: true,
        right: [
            {
                type: Icons.MyFeather,
                name: 'plus',
                onPress: () =>
                    navigation.navigate('EditRecipeTabs', {
                        screen: 'EditRecipeStack',
                        params: {
                            screen: 'EditRecipe',
                            params: {
                                sectionId,
                            },
                        },
                    }),
            },
        ],
    })

    return (
        <Container backgroundColor={theme.background}>
            <ListItemRecyclerView
                Element={RecipeListItem}
                data={filteredRecipes}
                props={{}}
                loading={getRecipes.isLoading}
                dragDrop
                updateSlice={updateSlice}
                updateDatabase={updateDatabase}
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
