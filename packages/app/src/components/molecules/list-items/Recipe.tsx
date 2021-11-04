import React from 'react'
import styled from 'styled-components'
import { Recipe } from '@recipes/api-types/v1'
import { useNavigation } from '@react-navigation/native'
import ListItem from './ListItem'
import { Icon, Icons, View } from '@/components/base'
import { Editable } from '@/components/atoms'
import { utils } from '@/utils'
import { recipesActions, recipeService } from '@/redux'
import { useAppDispatch } from '@/hooks'
import { ListItemBaseProps } from '@/types'

interface SectionListItemProps extends ListItemBaseProps<Recipe> {
    handleSectionNameChange?: (text: string) => void
    handleSectionDescriptionChange?: (text: string) => void
}

function RecipeListItem({
    item,
    dropdownItems,
    onGesture,
    editable,
    handleSectionNameChange,
    handleSectionDescriptionChange,
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
        console.log(`OnPress ${item.name}, navigate or somethings`)
    }

    dropdownItems.push(logRecip, editRecip, deleteRecip)

    return (
        <ListItem
            items={
                !editable
                    ? utils.createDropDownItems(dropdownItems, 'recip')
                    : undefined
            }
            onPress={onPress}
            onGesture={onGesture}
        >
            <Container>
                <Editable
                    editable={editable}
                    text={item.name}
                    handleTextChange={handleSectionNameChange}
                    type="SubHeader"
                    paddingHorizontal="s"
                    numberOfLines={1}
                    placeholder="Section Name"
                />
                <Editable
                    editable={editable}
                    text={item.description}
                    handleTextChange={handleSectionDescriptionChange}
                    paddingHorizontal="s"
                    numberOfLines={2}
                    placeholder="Description"
                />
                <PropertyRow>
                    <Icon type={Icons.MyFeather} name="menu" />
                </PropertyRow>
            </Container>
        </ListItem>
    )
}

export default RecipeListItem

const Container = styled(View)`
    flex-direction: column;
    justify-content: center;
`
const PropertyRow = styled(View)`
    flex-direction: row;
    align-items: center;
`
