import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import _ from 'lodash'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { Recipe } from '@/data'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { MyFeather, MyMaterialCommunityIcons, MyMaterialIcons } from '../Icons'
import { DropDownMenu, DropDownItem } from '../user-input/DropdownMenu'
import { myRecipeActions } from '@/redux/actions'
import { ButtonIcon } from '../user-input/Buttons'
import { recipeUtils, utils } from '@/config'

function createDropDownItems(
    onPresses: Array<() => Promise<void>>
): DropDownItem[] {
    return onPresses.map((onPress) => {
        // Slice recipe off the function name
        const text = utils.capitalizeFirstLetter(
            onPress.name.slice(0, onPress.name.length - 6)
        )
        return {
            id: onPresses.indexOf(onPress),
            text,
            onPress,
        }
    })
}

// Edit Actions determine what can be edited and what is displayed in this component
// Edit-all, is for editing everything
// Edit-people is for editing just the people count when viewing a recipe
// Edit-none is for editing nothing, when viewing a list of recipes

interface RecipeHeaderProps {
    recipe: Recipe
    editActions: 'Edit-all' | 'Edit-people' | 'Edit-none'
    dropDownDependencies?: any[]
    onPress?: () => void
    handleNameChange?: (text: string) => void
    handleDescriptionChange?: (text: string) => void
    handlePeopleCountChange?: (text: string) => void
    handlePrepareTimeChange?: (text: string) => void
    handlePublishedAtChange?: () => void
}

function RecipeHeaderComponent({
    recipe,
    editActions: editable,
    dropDownDependencies,
    onPress,
    handleNameChange,
    handleDescriptionChange,
    handlePeopleCountChange,
    handlePrepareTimeChange,
    handlePublishedAtChange,
}: RecipeHeaderProps): JSX.Element {
    const { settings } = useAppSelector((state) => state)
    const { theme } = settings
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const { routeNames } = useNavigationState((state) => state)

    async function deleteRecipe(): Promise<void> {
        dispatch(myRecipeActions.deleteRecipe(recipe, navigation))
    }

    async function editRecipe(): Promise<void> {
        navigation.navigate('EditRecipe' as never, { recipe } as never)
    }

    async function copyRecipe(): Promise<void> {
        const copy = JSON.parse(JSON.stringify(recipe))
        copy.copyOf = recipe.id
        copy.publishedAt = null
        copy.createdAt = new Date()
        dispatch(myRecipeActions.createRecipe(copy, navigation))
    }

    const dropDownFunctions = []
    if (routeNames.includes('Recipes')) {
        dropDownFunctions.push(editRecipe, deleteRecipe)
    } else {
        dropDownFunctions.push(copyRecipe)
    }

    const dropDownItems: DropDownItem[] = createDropDownItems(dropDownFunctions)

    const prepareTimeStyle = (): { color: string } => {
        if (!editable || recipe.prepareTime > 0) return { color: theme.text }
        return { color: theme.grey }
    }

    const peopleCountStyle = (): { color: string } => {
        if (!editable || recipe.peopleCount > 0) return { color: theme.text }
        return { color: theme.grey }
    }

    const displayDropDown = typeof dropDownDependencies !== 'undefined'

    const displayDescription =
        editable !== 'Edit-none' || recipe.description.length !== 0

    const displayPublishIcon =
        editable === 'Edit-all' ||
        recipe.publishedAt !== null ||
        recipe.copyOf !== null

    let publishIconName = 'published-with-changes'
    if (recipe.copyOf !== null) {
        publishIconName = 'content-copy'
    } else if (recipe.publishedAt === null) {
        publishIconName = 'publish'
    }

    let publishIconColor = theme.text
    if (recipe.publishedAt !== null || recipe.copyOf !== null) {
        publishIconColor = theme.primary
    }

    return (
        <Header onPress={onPress} disabled={!onPress}>
            {/* Recipe Name Input Field */}
            <RecipeNameView>
                <RecipeNameTextInput
                    editable={editable === 'Edit-all'}
                    value={recipe.name}
                    placeholder="New Recipe"
                    placeholderTextColor={theme.grey}
                    onChangeText={handleNameChange}
                    multiline
                />
            </RecipeNameView>

            {/* Recipe Description Input Field */}
            {displayDescription ? (
                <DescriptionTextInput
                    editable={editable === 'Edit-all'}
                    placeholder="Description"
                    value={recipe.description}
                    placeholderTextColor={theme.grey}
                    onChangeText={handleDescriptionChange}
                    multiline
                />
            ) : null}
            <PropertiesContainer>
                {/* Prepare Time */}
                <PropertyView>
                    <MyMaterialCommunityIcons
                        name="timer-sand"
                        color={theme.text}
                    />
                    <Property
                        style={prepareTimeStyle()}
                        editable={editable === 'Edit-all'}
                        onChangeText={handlePrepareTimeChange}
                        value={recipe.prepareTime.toString()}
                        placeholder="0"
                        placeholderTextColor={
                            editable === 'Edit-people' ? theme.text : theme.grey
                        }
                        keyboardType="number-pad"
                    />
                </PropertyView>

                {/* People Count */}
                <PropertyView>
                    <MyFeather name="user" color={theme.text} />
                    <Property
                        style={peopleCountStyle()}
                        editable={['Edit-all', 'Edit-people'].includes(
                            editable
                        )}
                        onChangeText={handlePeopleCountChange}
                        value={recipe.peopleCount.toString()}
                        placeholder="0"
                        placeholderTextColor={theme.grey}
                        keyboardType="number-pad"
                    />
                </PropertyView>

                <PublishedView>
                    {displayPublishIcon ? (
                        <ButtonIcon
                            onPress={() =>
                                handlePublishedAtChange
                                    ? handlePublishedAtChange()
                                    : undefined
                            }
                            disabled={
                                editable !== 'Edit-all' ||
                                recipe.copyOf !== null
                            }
                            icon={
                                <MyMaterialIcons
                                    name={publishIconName}
                                    color={publishIconColor}
                                    size={25}
                                />
                            }
                        />
                    ) : undefined}
                </PublishedView>
            </PropertiesContainer>

            {/* Dropdown Menu */}
            {displayDropDown ? (
                <DropDownMenu
                    items={dropDownItems}
                    dependencies={dropDownDependencies}
                />
            ) : null}
        </Header>
    )
}

export const RecipeHeader = RecipeHeaderComponent

function recipeHeaderPropsChanged(prevProps: any, nextProps: any): boolean {
    if (
        !_.isEqual(
            prevProps.dropDownDependencies,
            nextProps.dropDownDependencies
        )
    )
        return false
    const oldRecipe = prevProps.recipe
    const newRecipe = nextProps.recipe

    const recipeDifferenceObject = recipeUtils.recipeDifference(
        oldRecipe,
        newRecipe
    )
    return Object.keys(recipeDifferenceObject).length === 0
}

export const MemoizedRecipeHeader = React.memo(
    RecipeHeaderComponent,
    recipeHeaderPropsChanged
)

const Header = styled(TouchableOpacity)`
    align-self: center;
    align-items: center;
    width: 100%;
    background-color: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme.primary};
    border-radius: 20px;
    border-width: 3px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 10px;
`

const RecipeNameView = styled(View)`
    width: 100%;
    border-bottom-color: ${(props) => props.theme.primary};
    border-bottom-width: 1px;
`

const RecipeNameTextInput = styled(TextInput)`
    width: 90%;
    padding-bottom: 10px;
    font-size: 22px;
    color: ${(props) => props.theme.text};
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
`

const DescriptionTextInput = styled(TextInput)`
    width: 90%;
    margin-top: 8px;
    margin-left: 8px;
    margin-right: 8px;
    color: ${(props) => props.theme.text};
`

const PropertiesContainer = styled(View)`
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding-top: 5px;
`

const PropertyView = styled(View)`
    flex: 4;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
`

const Property = styled(TextInput)`
    color: ${(props) => props.theme.text};
    font-size: 20px;
    padding-left: 5px;
    flex: 1;
`

const PublishedView = styled(View)`
    flex: 1;
    margin-end: 10px;
    align-items: flex-end;
    justify-content: flex-end;
`
