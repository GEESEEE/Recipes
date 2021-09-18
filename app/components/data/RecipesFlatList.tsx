import React from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import styled from 'styled-components'
import {
    useIsFocused,
    useNavigation,
} from '@react-navigation/native'
import { MemoizedRecipeHeader } from './RecipeHeader'
import { Recipe } from '../../data'

interface RecipesFlatListProps {
    recipes: Recipe[]
    dropdown?: boolean
    onEndReached?: () => void
}

const RecipesFlatList = React.forwardRef(
    (
        { recipes, dropdown, onEndReached }: RecipesFlatListProps,
        ref: any
    ): JSX.Element => {
        const navigation = useNavigation()


        const isFocused = useIsFocused()
        React.useEffect(() => {
            if (dropdown && isFocused) {
                setScrollPosition(scrollPosition + 1)
            }
        }, [isFocused])


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
                        editable="Edit-none"
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
