import React from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'
import { RecipeHeader } from '.'
import { Recipe } from '../../data'
import { useAppSelector } from '../../hooks'


interface RecipesFlatListProps {
    recipes: Recipe[]
    navigation: any
    dropdown?: boolean
}

function RecipesFlatList({
    recipes,
    navigation,
    dropdown
}: RecipesFlatListProps): JSX.Element {
    const [scrollPosition, setScrollPosition] = React.useState(0)

    function handleScroll(event: any): void {
        setScrollPosition(event.nativeEvent.contentOffset.y)
    }

    return (
        <RecipesList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{}}
            renderItem={({ item }) => (

                <RecipeHeader
                    recipe={item}
                    navigation={navigation}
                    editable="Edit-none"
                    dropdownDependencies={dropdown ? [scrollPosition] : undefined}
                    onPress={() =>
                        navigation.navigate('ViewRecipe', {
                            recipe: item,
                        })
                    }
                />

            )}
            onScroll={(e) => handleScroll(e)}
        />
    )

}

export default RecipesFlatList

const RecipesList = styled(FlatList as new () => FlatList<Recipe>)`
    width: 100%;
    padding-top: 5px;
`
