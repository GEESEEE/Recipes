import React, { memo } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components'
import { RecipeHeader } from '.'
import { Recipe } from '../../data'
import { recipeHeaderPropsChanged } from './RecipeHeader'

interface RecipesFlatListProps {
    recipes: Recipe[]
    navigation: any
    dropdown?: boolean
}

const MemoizedRecipeHeader = memo(RecipeHeader, recipeHeaderPropsChanged)

function RecipesFlatList({
    recipes,
    navigation,
    dropdown,
}: RecipesFlatListProps): JSX.Element {
    const [scrollPosition, setScrollPosition] = React.useState(0)

    function handleScroll(event: any): void {
        setScrollPosition(event.nativeEvent.contentOffset.y)
    }
    const dropDownDependencies = dropdown ? [scrollPosition] : undefined

    return (
        <RecipesList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{}}
            renderItem={({ item }) => (
                <MemoizedRecipeHeader
                    recipe={item}
                    navigation={navigation}
                    editable="Edit-none"
                    dropDownDependencies={dropDownDependencies}
                    onPress={() =>
                        navigation.navigate('ViewRecipe', {
                            recipe: item,
                        })
                    }
                />
            )}
            onScroll={(e) => (dropdown ? handleScroll(e) : undefined)}
        />
    )
}

export default RecipesFlatList

const RecipesList = styled(FlatList as new () => FlatList<Recipe>)`
    width: 100%;
    padding-top: 5px;
`
