import React, { memo } from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import styled from 'styled-components'
import { MemoizedRecipeHeader } from './RecipeHeader'
import { Recipe } from '../../data'

interface RecipesFlatListProps {
    recipes: Recipe[]
    navigation: any
    dropdown?: boolean
    onEndReached?: () => void
}



const RecipesFlatList = React.forwardRef(
    (
        { recipes, navigation, dropdown, onEndReached }: RecipesFlatListProps,
        ref: any
    ): JSX.Element => {
        const [scrollPosition, setScrollPosition] = React.useState(0)

        function handleScroll(event: any): void {
            setScrollPosition(event.nativeEvent.contentOffset.y)
        }

        const dropDownDependencies = dropdown
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
