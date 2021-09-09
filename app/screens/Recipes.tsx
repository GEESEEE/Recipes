import React from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationScreenProp } from 'react-navigation'
import styled from 'styled-components'
import {  RecipesRecyclerListView } from '../components/data'
import RecipesFlatList from '../components/data/RecipesFlatList'
import { applySearch } from '../config/utils'
import { Recipe } from '../data'
import { useAppSelector } from '../hooks/redux'

function RecipesScreen({
    navigation,
}: {
    navigation: NavigationScreenProp<string>
}): JSX.Element {
    const recipes = useAppSelector((state) => state.myRecipes)

    const search = navigation.state.params?.search
    const filteredRecipes = applySearch(recipes, search)


    return (
        <Container>
            <RecipesFlatList
                recipes={filteredRecipes}
                navigation={navigation}
                dropdown
            />
            {/* <RecipesList
                data={filteredRecipes}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{}}
                renderItem={({ item }) => (
                    <RecipeHeaderView>
                        <RecipeHeader
                            recipe={item}
                            navigation={navigation}
                            editable="Edit-none"
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
            /> */}
        </Container>
    )
}

export default RecipesScreen

const Container = styled(View)`
    flex: 1;
    background-color: ${(props) => props.theme.background};
    align-items: center;
`
