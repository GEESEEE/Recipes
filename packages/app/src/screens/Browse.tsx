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
    useBrowse,
    useAppDispatch,
} from '@/hooks'
import { ListItemRecyclerView, SortHeader } from '@/components/organisms'
import { RecipeListItem } from '@/components/molecules'
import { Spacing, Typography } from '@/styles'
import { recipeService, browseActions } from '@/redux'

function BrowseScreen({ navigation }: { navigation: any }): JSX.Element {
    const auth = useAuth()
    const { theme, textSize } = useSettings()
    const dispatch = useAppDispatch()
    const [page, setPage] = React.useState(1)

    const recipes = useBrowse()

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
            const res = data.data
            if (page === 1) {
                dispatch(browseActions.setRecipes(res))
            } else {
                dispatch(browseActions.addRecipes(res))
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

    function onEndReached() {
        console.log('onEndReached fetching', page + 1)
        fetch(page + 1)
    }

    useHeader(navigation, {
        title: 'Browse',
        drawer: true,
        search: true,
        sort: true,
        right: [],
    })

    return (
        <Container backgroundColor={theme.background}>
            <SortHeader />
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
                onEndReached={onEndReached}
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
