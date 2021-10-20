import React from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import styled from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MemoizedRecipeHeader } from './RecipeHeader'
import { Recipe } from '@/data'
import { useAppSelector, useDropdownRerender } from '@/hooks'
import { Loading4Dots } from '@/components/atoms'

interface RecipesFlatListProps {
    recipes: Recipe[]
    onEndReached?: () => void
}

const RecipesFlatList = React.forwardRef(
    (
        { recipes, onEndReached }: RecipesFlatListProps,
        ref: any
    ): JSX.Element => {
        const { settings } = useAppSelector((state) => state)
        const { theme } = settings

        const route = useRoute()
        const navigation = useNavigation()
        const displayDropdown = route.name === 'Recipes'

        const displayFooter = route.name === 'Browse'
        const displayFooterLoading = false
        const footerText = 'End of list'

        const [scrollPosition, handleScroll] = useDropdownRerender(
            displayDropdown,
            150
        )

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
                ListFooterComponent={
                    displayFooter ? (
                        <FooterView>
                            {displayFooterLoading ? (
                                <Loading4Dots
                                    backgroundColor={theme.background}
                                    dotColor={theme.primary}
                                    height={20}
                                />
                            ) : (
                                <FooterText>{footerText}</FooterText>
                            )}
                        </FooterView>
                    ) : null
                }
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

const FooterView = styled(View)`
    align-items: center;
    padding-bottom: 10px;
`

const FooterText = styled(Text)`
    color: ${(props) => props.theme.primary};
`
