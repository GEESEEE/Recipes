import React from 'react'
import styled from 'styled-components'
import { Recipe } from '@recipes/api-types/v1'
import { RecyclerListView } from 'recyclerlistview'
import { View, Text } from '@/components/base'
import {
    useHeader,
    useSearch,
    useSettings,
    useDebounce,
    useUpdateEffect,
    useAuth,
} from '@/hooks'
import { ListItemRecyclerView } from '@/components/organisms'
import { RecipeListItem } from '@/components/molecules'
import { Spacing, Typography } from '@/styles'
import { recipeService } from '@/redux'
import { Button } from '@/components/atoms'

function BrowseScreen({ navigation }: { navigation: any }): JSX.Element {
    const auth = useAuth()
    const { theme, textSize } = useSettings()

    const [page, setPage] = React.useState(1)

    const [recipes, setRecipes] = React.useState<Recipe[]>([])
    function addRecipes(newRecipes: Recipe[]) {
        setRecipes([...recipes, ...newRecipes])
    }
    console.log('Recipes', recipes.length)
    const search = useSearch()
    const [skip, setSkip] = React.useState(true)

    const listRef = React.useRef<RecyclerListView<any, any>>(null)

    useUpdateEffect(() => {
        setSkip(auth.token.length <= 0)
    }, [auth.token])

    const { data, isLoading } = recipeService.useGetRecipesByScopesQuery(
        {
            scopes: ['published'],
            search: search.length > 0 ? [search] : undefined,
            sort: ['createtime'],
            page,
        },
        { skip }
    )

    useUpdateEffect(() => {
        setSkip(true)
        if (typeof data !== 'undefined') {
            if (page === 1) {
                setRecipes(data)
            } else {
                addRecipes(data)
            }
        }
    }, [data])

    function fetch(page: number) {
        if (page === 1) {
            listRef.current?.scrollToTop(true)
        }
        setPage(page)
        setSkip(false)
    }

    useDebounce(
        () => {
            fetch(1)
        },
        250,
        [search]
    )

    useHeader(navigation, {
        title: 'Browse',
        drawer: true,
        search: true,
        right: [],
    })

    return (
        <Container backgroundColor={theme.background}>
            <Text>Browse screen toch</Text>
            <Button
                type="Solid"
                text="NewPage"
                onPress={() => fetch(page + 1)}
            />
            <ListItemRecyclerView
                data={recipes}
                props={{}}
                Element={RecipeListItem}
                itemHeight={
                    16 +
                    Typography.lineHeight('SubHeader', textSize) +
                    2 * Typography.lineHeight('Text', textSize) +
                    Spacing.standardIconSize[textSize] +
                    8
                }
                loading={isLoading}
                onEndReached={() => fetch(page + 1)}
                ref={listRef}
            />
        </Container>
    )
}

export default BrowseScreen

const Container = styled(View)`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`
