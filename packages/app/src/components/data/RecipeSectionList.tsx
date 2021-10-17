import React from 'react'
import { StyleSheet, View, Text, SectionList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { useNavigationState } from '@react-navigation/native'
import IngredientListItem from './IngredientListItem'
import InstructionListItem from './InstructionListItem'
import { RecipeHeader } from './RecipeHeader'
import { Recipe, ListItem, Instruction, RecipeIngredient } from '@/data'
import { ButtonBorderless } from '../user-input/Buttons'
import { ErrorMessage } from '../user-input/ErrorMessage'
import { useAppSelector, useDropdownRerender } from '@/hooks'

type RecipeSectionListProps = {
    recipe: Recipe
    action: 'Edit' | 'Create' | 'View'

    // Recipe related
    handleNameChange?: (text: string) => void
    handleDescriptionChange?: (text: string) => void
    handlePeopleCountChange?: (text: string) => void
    handlePrepareTimeChange?: (text: string) => void
    handlePublishedAtChange?: () => void

    // Ingredient related
    handleIngredientNameChange?: (key: string, text: string) => void
    handleIngredientAmountChange?: (key: string, text: string) => void
    handleIngredientUnitChange?: (key: string, text: string) => void
    handleRemoveIngredient?: (key: string) => void
    handleAddIngredient?: () => void
    ingredientError?: string

    // Instruction related
    handleInstructionTextChange?: (key: string, text: string) => void
    handleRemoveInstruction?: (key: string) => void
    handleAddInstruction?: () => void

    FooterComponent?: JSX.Element
}

const RecipeSectionList = ({
    recipe,
    action,

    handleNameChange,
    handleDescriptionChange,
    handlePeopleCountChange,
    handlePrepareTimeChange,
    handlePublishedAtChange,

    handleIngredientNameChange,
    handleIngredientAmountChange,
    handleIngredientUnitChange,
    handleRemoveIngredient,
    handleAddIngredient,
    ingredientError,

    handleInstructionTextChange,
    handleRemoveInstruction,
    handleAddInstruction,

    FooterComponent,
}: RecipeSectionListProps): JSX.Element => {
    const { auth } = useAppSelector((state) => state)
    const { routeNames } = useNavigationState((state) => state)
    const displayDropdown =
        routeNames.includes('Browse') && recipe.authorId !== auth.user.id

    const insets = useSafeAreaInsets()
    const editable = ['Edit', 'Create'].includes(action)
    const headerEditActions = editable ? 'Edit-all' : 'Edit-people'

    const [scrollPosition, handleScroll] = useDropdownRerender(
        displayDropdown,
        300
    )

    const dropDownDependencies = displayDropdown ? [scrollPosition] : undefined

    const sections = [
        {
            key: 'Ingredients',
            footerText: 'Add Ingredient',
            footerOnPress: handleAddIngredient,
            data: recipe.recipeIngredients as ListItem[],
            renderItem: ({ item }: any) => (
                <IngredientListItem
                    ingredient={item as RecipeIngredient}
                    ingredients={recipe.recipeIngredients!}
                    editable={editable}
                    handleIngredientNameChange={handleIngredientNameChange}
                    handleIngredientAmountChange={handleIngredientAmountChange}
                    handleIngredientUnitChange={handleIngredientUnitChange}
                    handleRemoveIngredient={handleRemoveIngredient}
                />
            ),
        },
        {
            key: 'Instructions',
            footerText: 'Add Instruction',
            footerOnPress: handleAddInstruction,
            data: recipe.instructions as ListItem[],
            renderItem: ({ item }: any) => (
                <InstructionListItem
                    instruction={item as Instruction}
                    instructions={recipe.instructions!}
                    editable={editable}
                    handleInstructionTextChange={handleInstructionTextChange}
                    handleRemoveInstruction={handleRemoveInstruction}
                />
            ),
        },
    ]

    return (
        <List
            onScroll={(e) => (displayDropdown ? handleScroll(e) : undefined)}
            sections={sections}
            contentContainerStyle={[
                styles.contentContainer,
                { paddingTop: insets.top + 10 },
            ]}
            ListHeaderComponent={
                <View>
                    <RecipeHeader
                        recipe={recipe}
                        editActions={headerEditActions}
                        dropDownDependencies={dropDownDependencies}
                        handleNameChange={handleNameChange}
                        handleDescriptionChange={handleDescriptionChange}
                        handlePeopleCountChange={handlePeopleCountChange}
                        handlePrepareTimeChange={handlePrepareTimeChange}
                        handlePublishedAtChange={handlePublishedAtChange}
                    />
                    <RecipeHeaderBottomPadding />
                </View>
            }
            ListFooterComponent={FooterComponent}
            renderSectionHeader={({ section }: any) => (
                <SectionHeader>
                    <SectionHeaderText>{section.key}</SectionHeaderText>
                </SectionHeader>
            )}
            renderSectionFooter={({ section }: any) => {
                if (editable) {
                    return (
                        <SectionSeparatorView>
                            <SectionFooter>
                                <ButtonBorderless
                                    text={section.footerText}
                                    onPress={section.footerOnPress}
                                />
                            </SectionFooter>
                            <ErrorMessage
                                errorMessage={
                                    section.key === 'Ingredients'
                                        ? ingredientError
                                        : undefined
                                }
                                size="Medium"
                            />
                        </SectionSeparatorView>
                    )
                }

                return (
                    <SectionSeparatorView>
                        {section.data.length === 0 ? (
                            <SectionFooter>
                                <FooterPadding />
                            </SectionFooter>
                        ) : undefined}
                        <FooterPadding />
                    </SectionSeparatorView>
                )
            }}
        />
    )
}

export default RecipeSectionList

const List = styled(SectionList as new () => SectionList<ListItem>)`
    width: 100%;
`

const styles = StyleSheet.create({
    contentContainer: {
        width: '90%',
        alignSelf: 'center',
    },
})

const SectionHeader = styled(View)`
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    background-color: ${(props) => props.theme.background};

    padding-top: 5px;
    padding-bottom: 5px;
    border-color: ${(props) => props.theme.primary};
    border-top-width: 3px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    border-left-width: 3px;
    border-right-width: 3px;
    border-bottom-width: 1px;
`

const SectionHeaderText = styled(Text)`
    flex: 1px;
    font-size: 18px;
    text-align: center;
    color: ${(props) => props.theme.text};
`

const SectionFooter = styled(View)`
    align-items: center;
    justify-content: center;

    border-color: ${(props) => props.theme.primary};
    border-left-width: 3px;
    border-right-width: 3px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-bottom-width: 3px;
`

const SectionSeparatorView = styled(View)``

const FooterPadding = styled(View)`
    margin-bottom: 16px;
`

const RecipeHeaderBottomPadding = styled(View)`
    height: 20px;
`