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
} from '@/hooks'
import { ListItemRecyclerView, SortHeader } from '@/components/organisms'
import { RecipeListItem } from '@/components/molecules'
import { Spacing, Typography } from '@/styles'
import { recipeService, browseActions } from '@/redux'
import { Button, Loading4Dots } from '@/components/atoms'

function BrowseScreen({ navigation }: { navigation: any }): JSX.Element {
    const auth = useAuth()
    const dispatch = useAppDispatch()
    const { theme, textSize } = useSettings()

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
                onEndReached={newPage}
                ref={listRef}
                onRefresh={async () => fetch()}
                renderFooter={() => {
                    if (isFetching) {
                        return (
                            <Loading4Dots
                                height={Typography.lineHeight('Text', textSize)}
                            />
                        )
                    }
                    if (nextPage === null) {
                        return (
                            <FooterContainer>
                                <Text>End of List</Text>
                            </FooterContainer>
                        )
                    }
                    return (
                        <Button
                            type="Clear"
                            text="Load more"
                            onPress={() => newPage()}
                        />
                    )
                }}
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
    width: 100%;
    align-items: center;
`
