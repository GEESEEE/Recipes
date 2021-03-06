import React from 'react'
import styled from 'styled-components'
import { RecyclerListView } from 'recyclerlistview'
import { View, Icons, Text } from '@/components/base'
import {
    useHeader,
    useSearch,
    useSettings,
    useUpdateEffect,
    useAuth,
    useBrowse,
    useAppDispatch,
    useSortState,
    useRecipeHeight,
} from '@/hooks'
import { ListItemRecyclerView } from '@/components/organisms'
import { RecipeListItem } from '@/components/molecules'
import { recipeService, browseActions } from '@/redux'
import { Button } from '@/components/atoms'

function BrowseScreen({ navigation }: { navigation: any }): JSX.Element {
    const auth = useAuth()
    const dispatch = useAppDispatch()
    const { theme } = useSettings()
    const recipeHeight = useRecipeHeight()

    const recipes = useBrowse()

    const search = useSearch()
    const sort = useSortState()

    const [nextPage, setNextPage] = React.useState<number | null>(2)
    const listRef = React.useRef<RecyclerListView<any, any>>(null)

    const [params, setParams] = React.useState<recipeService.GetRecipeParams>(
        {}
    )

    function newPage() {
        if (nextPage !== null) {
            setParams({ ...params, page: (params.page as number) + 1 })
        }
    }

    function fetch() {
        setParams({
            scopes: ['published'],
            search: search.length > 0 ? [search] : undefined,
            sort,
            page: 1,
        })
        listRef.current?.scrollToTop(true)
    }

    React.useEffect(() => {
        fetch()
    }, [])

    const skip = auth.token.length <= 0
    const { data, isLoading, isFetching } =
        recipeService.useGetRecipesByScopesQuery(params, { skip })

    useUpdateEffect(() => {
        if (typeof data !== 'undefined') {
            setNextPage(data.next_page ?? null)
            const res = data.data
            if (params.page === 1) {
                dispatch(browseActions.setRecipes(res))
            } else {
                dispatch(browseActions.addRecipes(res))
            }
        }
    }, [data])

    useHeader(navigation, {
        title: 'Browse',
        drawer: true,
        search: true,
        sort: true,
        right: [
            {
                type: Icons.MyMaterialCommunityIcons,
                name: 'refresh',
                onPress: () => fetch(),
                loading: isFetching,
            },
        ],
    })

    return (
        <Container backgroundColor={theme.background}>
            <ListItemRecyclerView
                data={recipes}
                props={{ useDropdown: true }}
                Element={RecipeListItem}
                itemHeight={recipeHeight}
                loading={isLoading}
                onEndReached={newPage}
                ref={listRef}
                onRefresh={async () => fetch()}
                renderFooter={() => (
                    <FooterContainer paddingVertical="s">
                        {nextPage === null ? (
                            <Text color={theme.primary}>End of List</Text>
                        ) : (
                            <Button
                                type="Clear"
                                text="Load More"
                                textTransform="capitalize"
                                paddingVertical="n"
                                marginVertical="s"
                                width="s"
                                onPress={() => newPage()}
                                loading={isFetching}
                            />
                        )}
                    </FooterContainer>
                )}
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

const FooterContainer = styled(View)`
    align-items: center;
`
