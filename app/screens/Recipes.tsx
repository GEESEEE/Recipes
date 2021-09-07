import React from 'react'
import { FlatList, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationScreenProp } from 'react-navigation'
import { useHeaderHeight } from 'react-navigation-stack'
import styled from 'styled-components'
import { RecipeHeader } from '../components/data'
import { applySearch } from '../config/utils'
import { Recipe } from '../data'
import { useAppSelector } from '../hooks/redux'

function RecipesScreen({
    navigation,
}: {
    navigation: NavigationScreenProp<string>
}): JSX.Element {
    const recipes = useAppSelector((state) => state.myRecipes)
    const insets = useSafeAreaInsets()
    const headerHeight = useHeaderHeight() - insets.top

    const search = navigation.state.params?.search
    const filteredRecipes = applySearch(recipes, search)

    const [scrollPosition, setScrollPosition] = React.useState(0)

    function handleScroll(event: any): void {
        setScrollPosition(event.nativeEvent.contentOffset.y)
    }

    return (
        <Container>
            <RecipesList
                data={filteredRecipes}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{}}
                renderItem={({ item }) => (
                    <RecipeHeaderView>
                        <RecipeHeader
                            recipe={item}
                            navigation={navigation}
                            editable="Edit-none"
                            dropdown
                            dropdownDependencies={[scrollPosition]}
                            onPress={() =>
                                navigation.navigate('ViewRecipe', {
                                    recipe: item,
                                })
                            }
                        />
                        <Separator />
                    </RecipeHeaderView>
                )}
                onScroll={handleScroll}
            />
        </Container>
    )
}

export default RecipesScreen

const Container = styled(View)`
    flex: 1;
    background-color: ${(props) => props.theme.background};
    align-items: center;
`

const RecipesList = styled(FlatList as new () => FlatList<Recipe>)`
    width: 100%;
    padding-top: 5px;
`

const RecipeHeaderView = styled(View)`
    width: 90%;
    align-self: center;
`
const Separator = styled(View)`
    height: 20px;
`
