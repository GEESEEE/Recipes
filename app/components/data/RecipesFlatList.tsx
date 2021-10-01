import React from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import styled from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MemoizedRecipeHeader } from './RecipeHeader'
import { Recipe } from '@/data'
import { useDropdownRerender } from '@/hooks'

interface RecipesFlatListProps {
    recipes: Recipe[]
    onEndReached?: () => void
}

const RecipesFlatList = React.forwardRef(
    (
        { recipes, onEndReached }: RecipesFlatListProps,
        ref: any
    ): JSX.Element => {
        const route = useRoute()
        const navigation = useNavigation()
        const displayDropdown = route.name === 'Recipes'

        const [scrollPosition, handleScroll] = useDropdownRerender(displayDropdown, 150)

        const dropDownDependencies = displayDropdown
            ? [scrollPosition, recipes.length]
            : undefined

        return (
            <RecipesList
                ref={ref}
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <MemoizedRecipeHeader
                        recipe={item}
                        editActions="Edit-none"
                        dropDownDependencies={dropDownDependencies}
                        onPress={() =>
                            navigation.navigate(
                                'ViewRecipe' as never,
                                {
                                    recipe: item,
                                } as never
                            )
                        }
                    />
                )}
                onScroll={(e) =>
                    displayDropdown ? handleScroll(e) : undefined
                }
                onEndReached={() => (onEndReached ? onEndReached() : undefined)}
                ListFooterComponent={<Footer />}
            />
        )
    }
)

export default RecipesFlatList

const RecipesList = styled(FlatList as new () => FlatList<Recipe>)`
    width: 90%;
    padding-top: 5px;
`

const styles = StyleSheet.create({
    contentContainer: {
        justifyContent: 'flex-start',
    },
})

const Footer = (): JSX.Element => (
    <FooterView>
        <FooterText>End of List</FooterText>
    </FooterView>
)

const FooterView = styled(View)`
    align-items: center;
`

const FooterText = styled(Text)`
    color: ${(props) => props.theme.primary};
    padding-bottom: 10px;
`
