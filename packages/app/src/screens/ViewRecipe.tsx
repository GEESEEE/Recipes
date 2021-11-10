import React from 'react'
import styled from 'styled-components'
import { SectionList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Instruction, Recipe, RecipeIngredient } from '@recipes/api-types/v1'
import { View, Text, Icons } from '@/components/base'
import { useSettings, useHeader, useRecipes } from '@/hooks'
import {
    IngredientListItem,
    InstructionListItem,
    RecipeListItem,
} from '@/components/molecules'
import { ListItem } from '@/types'
import { handleNumericTextInput, round } from '@/utils'

type ViewRecipeProps = {
    navigation: any
}

function ViewRecipeScreen({ navigation }: ViewRecipeProps): JSX.Element {
    const { theme } = useSettings()
    const recipes = useRecipes()

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
    const existRecipe =
        typeof passedRecipe !== 'undefined' ? { ...passedRecipe } : new Recipe()
    const peopleCount = passedRecipe?.peopleCount || 1
    const [recipe, setRecipe] = React.useState<Recipe>(existRecipe)

    function mapIngredients(): void {
        const multiplier = recipe.peopleCount / peopleCount

        const recipeIngredients = recipe.recipeIngredients.map((tempIngr) => {
            const newIngr = { ...tempIngr }
            const existIngr = existRecipe.recipeIngredients.find(
                (ingr) => ingr.id === tempIngr.id
            )

            if (typeof existIngr !== 'undefined') {
                newIngr.amount = round(existIngr.amount * multiplier, 3)
            }
            return newIngr
        })
        setRecipe({ ...recipe, recipeIngredients })
    }

    function incrementPeopleCount(): void {
        recipe.peopleCount = recipe.peopleCount + 1
        mapIngredients()
    }

    function decrementPeopleCount(): void {
        recipe.peopleCount = recipe.peopleCount - 1
        mapIngredients()
    }

    function changePeopleCount(text: string): void {
        const val = handleNumericTextInput(text, true)
        recipe.peopleCount = val
        mapIngredients()
    }

    const keyExtractor = (item: ListItem) => item.id.toString()
    const sections = [
        {
            key: 'Ingredients',
            data: recipe.recipeIngredients,
            renderItem: ({ item }: any) => {
                return (
                    <IngredientListItem
                        item={item as RecipeIngredient}
                        releaseHeight
                    />
                )
            },
            keyExtractor,
        },
        {
            key: 'Instructions',
            data: recipe.instructions,
            renderItem: ({ item }: any) => {
                return (
                    <InstructionListItem
                        item={item as Instruction}
                        instructions={recipe.instructions}
                        releaseHeight
                    />
                )
            },
            keyExtractor,
        },
    ]

    useHeader(navigation, {
        title:
            typeof passedRecipe !== 'undefined' ? recipe.name : 'View Recipe',
        right: [
            {
                type: Icons.MyMaterialIcons,
                name: 'edit',
                onPress: () =>
                    navigation.navigate('EditRecipeTabs', {
                        screen: 'EditRecipeStack',
                        params: {
                            screen: 'EditRecipe',
                            params: {
                                sectionId: recipe.sectionId,
                                recipeId: recipe.id,
                            },
                        },
                    }),
            },
        ],
    })

    return (
        <Container backgroundColor={theme.background}>
            <StyledList
                sections={sections}
                ListHeaderComponent={
                    <RecipeListItem
                        item={recipe}
                        editable
                        incrementPeopleCount={incrementPeopleCount}
                        decrementPeopleCount={decrementPeopleCount}
                        changePeopleCount={changePeopleCount}
                        releaseHeight
                    />
                }
                renderSectionHeader={({ section }: any) => (
                    <SectionHeaderText
                        type="SubHeader"
                        color={theme.primary}
                        paddingVertical="s"
                    >
                        {section.key}
                    </SectionHeaderText>
                )}
                renderSectionFooter={() => <View paddingVertical="s" />}
            />
        </Container>
    )
}

export default ViewRecipeScreen

const Container = styled(View)`
    flex: 1;
`

const StyledList = styled(SectionList as new () => SectionList<ListItem>)``

const SectionHeaderText = styled(Text)`
    align-self: center;
`
