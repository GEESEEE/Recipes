import React, { useLayoutEffect } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components'
import * as SecureStore from 'expo-secure-store'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { View } from '@/components/base'
import { HeaderComponent } from '@/routes/components'
import { LoginModal, LoadingModal } from './modals'
import { authActions, authService } from '@/redux'

function BrowseScreen({ navigation }: { navigation: any }): JSX.Element {
    const { auth, settings } = useAppSelector((state) => state)
    const { theme } = settings

    const listRef = React.useRef<FlatList>()

    const dispatch = useAppDispatch()
    const [verifyToken, verifyTokenStatus] =
        authService.useVerifyTokenMutation()

    async function retrieveToken(): Promise<void> {
        const token = await SecureStore.getItemAsync('token')
        if (token) {
            const res = await verifyToken(token)
            if ('data' in res) {
                await dispatch(authActions.login({ user: res.data, token }))
            }
        }
    }

    React.useEffect(() => {
        retrieveToken()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <HeaderComponent navigation={navigation} listRef={listRef} />
            ),
        })
    }, [navigation])

    // const onEndReached = (): void => {
    //     if (browseRecipes.nextPage !== null && !browseRecipes.loading) {
    //         const params = {
    //             ...browseRecipes.currentParams,
    //             page: browseRecipes.nextPage,
    //         }
    //         dispatch(browseRecipeActions.addRecipes(params))
    //     }
    // }

    // const displayHeader =
    //     browseSearch.length > 0 || browseSort.sortState.length > 0

    return (
        <Container backgroundColor={theme.background}>
            {verifyTokenStatus.isLoading ? <LoadingModal /> : null}

            {auth.user.id < 0 ? <LoginModal /> : null}

            {/* <RecipesListHeader display={displayHeader} />
            <RecipesFlatList
                ref={listRef}
                recipes={browseRecipes.recipes}
                onEndReached={onEndReached}
            /> */}
        </Container>
    )
}

export default BrowseScreen

const Container = styled(View)`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`
