import React from 'react'
import styled from 'styled-components'
import { SectionList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Instruction, Recipe, RecipeIngredient } from '@recipes/api-types/v1'
import { View, Text, Icons } from '@/components/base'
import { Counter } from '@/components/atoms'
import {
    useSettings,
    useHeader,
    useRecipes,
    useBrowse,
    useRecipeDropdownItems,
} from '@/hooks'
import {
    DropdownMenu,
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
    const myRecipes = useRecipes()
    const browseRecipes = useBrowse()

    const route = useRoute() as {
        params?: { sectionId: number | null; recipeId: number }
    }

    let sectionId = -1
    let recipeId = -1
    if (typeof route.params !== 'undefined') {
        const { params } = route
        recipeId = params.recipeId
        if (params.sectionId !== null) {
            sectionId = params.sectionId
        }
    }

    let passedRecipe: Recipe | undefined
    const sectionRecipes = myRecipes[sectionId]
    const isBrowse = typeof sectionRecipes === 'undefined'
    if (isBrowse) {
        passedRecipe = browseRecipes.find((recipe) => recipe.id === recipeId)
    } else {
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
    const listSections = [
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

    const recipeDropdownItems = useRecipeDropdownItems(recipe, isBrowse)

    useHeader(navigation, {
        title:
            typeof passedRecipe !== 'undefined' ? recipe.name : 'View Recipe',
        right: [
            {
                element: DropdownMenu,
                props: {
                    items: recipeDropdownItems,
                },
            },
        ],
    })

    return (
        <Container backgroundColor={theme.background}>
            <StyledList
                sections={listSections}
                ListHeaderComponent={
                    <HeaderContainer>
                        <RecipeListItem item={recipe} editable releaseHeight />
                        <Counter
                            increment={incrementPeopleCount}
                            decrement={decrementPeopleCount}
                            value={recipe.peopleCount}
                            iconType={Icons.MyMaterialIcons}
                            iconName="person"
                            onChange={changePeopleCount}
                        />
                    </HeaderContainer>
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

const HeaderContainer = styled(View)`
    align-items: center;
`

const StyledList = styled(SectionList as new () => SectionList<ListItem>)``

const SectionHeaderText = styled(Text)`
    align-self: center;
`
