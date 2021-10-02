import React, { useLayoutEffect } from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { RecipesFlatList, RecipesListHeader } from '@/components/data'
import { authActions, browseRecipeActions } from '@/redux/actions'
import { HeaderComponent } from '@/routes/components'
import { RegisterModal, LoginModal, LoadingModal } from './modals'

function BrowseScreen({ navigation }: { navigation: any }): JSX.Element {
    const { browseRecipes, browseSort, browseSearch, auth } = useAppSelector(
        (state) => state
    )
    const dispatch = useAppDispatch()
    const listRef = React.useRef<FlatList>()

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <HeaderComponent navigation={navigation} listRef={listRef} />
            ),
        })
    }, [navigation])

    // On first load, retrieve token
    React.useEffect(() => {
        dispatch(authActions.retrieveToken(navigation))
    }, [])

    const [showRegisterScreen, setShowRegisterScreen] = React.useState(false)

    const onEndReached = (): void => {
        if (browseRecipes.nextPage !== null && !browseRecipes.loading) {
            const params = {
                ...browseRecipes.currentParams,
                page: browseRecipes.nextPage,
            }
            dispatch(browseRecipeActions.addRecipes(params))
        }
    }

    const displayHeader =
        browseSearch.length > 0 || browseSort.sortState.length > 0

    return (
        <Container>
            {auth.loadingData ? <LoadingModal /> : null}

            {!auth.dataLoaded ? (
                <LoginModal
                    navigation={navigation}
                    showRegister={() => setShowRegisterScreen(true)}
                />
            ) : null}

            {showRegisterScreen ? (
                <RegisterModal
                    navigation={navigation}
                    showLogin={() => setShowRegisterScreen(false)}
                />
            ) : null}

            <RecipesListHeader display={displayHeader} />
            <RecipesFlatList
                ref={listRef}
                recipes={browseRecipes.recipes}
                onEndReached={onEndReached}
            />
        </Container>
    )
}

export default BrowseScreen

const Container = styled(View)`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: ${(props) => props.theme.background};
    padding-bottom: 5px;
`
