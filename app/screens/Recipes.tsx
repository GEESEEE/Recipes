import React from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationScreenProp } from 'react-navigation'
import { useHeaderHeight } from 'react-navigation-stack'
import styled from 'styled-components'
import { RecipeHeader } from '../components/data'
import { Recipe } from '../data'
import { useAppSelector } from '../hooks/redux'


function RecipesScreen({
    navigation,
}: {
    navigation: NavigationScreenProp<string>
}): JSX.Element {
    const recipes = useAppSelector((state) => state.recipes)
    const insets = useSafeAreaInsets()
    const headerHeight = useHeaderHeight() - insets.top

    return (
        <Container>
            <RecipesList
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{paddingTop: headerHeight}}
                renderItem={({ item }) => (
                    <RecipeHeader
                        recipe={item}
                        navigation={navigation}
                        editable='Edit-none'
                        dropdown
                        onPress={() => navigation.navigate('ViewRecipe', { recipe: item })}
                    />
                )}
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
`
