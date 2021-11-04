import React from 'react'
import styled from 'styled-components'
import { Recipe } from '@recipes/api-types/v1'
import { useNavigation } from '@react-navigation/native'
import ListItem from './ListItem'
import { Icon, Icons, View, Text } from '@/components/base'
import { Counter, Editable } from '@/components/atoms'
import { utils } from '@/utils'
import { recipesActions, recipeService } from '@/redux'
import { useAppDispatch } from '@/hooks'
import { ListItemBaseProps } from '@/types'

interface SectionListItemProps extends ListItemBaseProps<Recipe> {
    handleSectionNameChange?: (text: string) => void
    handleSectionDescriptionChange?: (text: string) => void
    incrementPeopleCount?: () => void
    decrementPeopleCount?: () => void
}

function RecipeListItem({
    item,
    dropdownItems,
    onGesture,
    editable,
    releaseHeight,
    handleSectionNameChange,
    handleSectionDescriptionChange,
    incrementPeopleCount,
    decrementPeopleCount,
}: SectionListItemProps): JSX.Element {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()

    dropdownItems = dropdownItems || []

    const [deleteRecipe] = recipeService.useDeleteRecipeMutation()

    function logRecip(): void {
        console.log('Logging Recipe', item.name)
    }

    async function deleteRecip(): Promise<void> {
        const args = { sectionId: item.sectionId, recipeId: item.id }
        const res = await deleteRecipe(args)
        if ('data' in res) {
            dispatch(recipesActions.removeRecipe(args))
        }
    }

    function editRecip(): void {
        navigation.navigate('EditRecipeTabs', {
            screen: 'EditRecipeStack',
            params: {
                screen: 'EditRecipe',
                params: {
                    sectionId: item.sectionId,
                    recipeId: item.id,
                },
            },
        })
    }

    function onPress(): void {
        navigation.navigate('ViewRecipe', {
            sectionId: item.sectionId,
            recipeId: item.id,
        })
    }

    dropdownItems.push(logRecip, editRecip, deleteRecip)

    const editPeopleCount =
        editable &&
        typeof incrementPeopleCount !== 'undefined' &&
        typeof decrementPeopleCount !== 'undefined'

    return (
        <ListItem
            items={
                !editable
                    ? utils.createDropDownItems(dropdownItems, 'recip')
                    : undefined
            }
            onPress={!editable ? onPress : undefined}
            onGesture={onGesture}
        >
            <Container>
                <Editable
                    releaseHeight={releaseHeight}
                    text={item.name}
                    handleTextChange={handleSectionNameChange}
                    type="SubHeader"
                    paddingHorizontal="s"
                    numberOfLines={1}
                    placeholder="Section Name"
                />
                <Editable
                    releaseHeight={releaseHeight}
                    text={item.description}
                    handleTextChange={handleSectionDescriptionChange}
                    paddingHorizontal="s"
                    numberOfLines={2}
                    placeholder="Description"
                />
                <PropertyRow>
                    <Property
                        iconType={Icons.MyMaterialCommunityIcons}
                        iconName="timer-sand"
                        text={item.prepareTime}
                    />
                    {editPeopleCount ? (
                        <Counter
                            increment={incrementPeopleCount}
                            decrement={decrementPeopleCount}
                            value={item.peopleCount}
                            icon={
                                <Icon
                                    type={Icons.MyMaterialIcons}
                                    name="person"
                                />
                            }
                        />
                    ) : (
                        <Property
                            iconType={Icons.MyMaterialIcons}
                            iconName="person"
                            text={item.peopleCount}
                        />
                    )}
                </PropertyRow>
            </Container>
        </ListItem>
    )
}

export default RecipeListItem

const Property = ({
    iconType,
    iconName,
    text,
}: {
    iconType: any
    iconName: string
    text: string | number
}): JSX.Element => {
    return (
        <PropertyContainer paddingVertical="s" width="s">
            <Icon type={iconType} name={iconName} />
            <Text type="SubHeader">{text}</Text>
        </PropertyContainer>
    )
}

const Container = styled(View)`
    flex-direction: column;
    justify-content: center;
`
const PropertyRow = styled(View)`
    flex-direction: row;
    align-items: center;
`

const PropertyContainer = styled(View)`
    flex-direction: row;
`
