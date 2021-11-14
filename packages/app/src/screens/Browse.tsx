import React from 'react'
import styled from 'styled-components'
import { View, Text } from '@/components/base'
import { useHeader, useSearch, useSettings, useDebounce } from '@/hooks'
import { ListItemRecyclerView } from '@/components/organisms'
import { RecipeListItem } from '@/components/molecules'
import { Spacing, Typography } from '@/styles'
import { recipeService } from '@/redux'
import { Button } from '@/components/atoms'

function BrowseScreen({ navigation }: { navigation: any }): JSX.Element {
    const { theme, textSize } = useSettings()

    const [page, setPage] = React.useState(1)

    const search = useSearch()

    const recipes = recipeService.useGetRecipesByScopesQuery({
        scopes: ['published'],
        search: search.length > 0 ? [search] : undefined,
        sort: ['createtime'],
        page,
    })

    useDebounce(
        () => {
            console.log('Search', search)
        },
        500,
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
                onPress={() => setPage(page + 1)}
            />
            <ListItemRecyclerView
                data={recipes.data || []}
                props={{}}
                Element={RecipeListItem}
                itemHeight={
                    16 +
                    Typography.lineHeight('SubHeader', textSize) +
                    2 * Typography.lineHeight('Text', textSize) +
                    Spacing.standardIconSize[textSize] +
                    8
                }
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
