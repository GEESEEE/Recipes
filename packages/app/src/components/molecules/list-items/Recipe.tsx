import React from 'react'
import styled from 'styled-components'
import { Recipe } from '@recipes/api-types/v1'
import { useNavigation, useRoute } from '@react-navigation/native'
import ListItem from './ListItem'
import { Icon, Icons, View, Text } from '@/components/base'
import { Counter, Editable } from '@/components/atoms'
import { recipesActions, recipeService } from '@/redux'
import { useAppDispatch, useSections } from '@/hooks'
import { ListItemBaseProps } from '@/types'

interface SectionListItemProps extends ListItemBaseProps<Recipe> {
    handleSectionNameChange?: (text: string) => void
    handleSectionDescriptionChange?: (text: string) => void
    incrementPeopleCount?: () => void
    decrementPeopleCount?: () => void
    changePeopleCount?: (text: string) => void
}

function RecipeListItem({
    item,
    useDropdown,
    onGesture,
    editable,
    releaseHeight,
    hide,
    handleSectionNameChange,
    handleSectionDescriptionChange,
    incrementPeopleCount,
    decrementPeopleCount,
    changePeopleCount,
}: SectionListItemProps): JSX.Element {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()

    const route = useRoute()
    const sections = useSections()
    const isBrowse = route.name === 'Browse'

    const [deleteRecipe] = recipeService.useDeleteRecipeMutation()

    async function deleteRecip(): Promise<void> {
        if (item.sectionId !== null) {
            const args = { sectionId: item.sectionId, recipeId: item.id }
            const res = await deleteRecipe(args)
            if ('data' in res) {
                dispatch(recipesActions.removeRecipe(args))
            }
        }
    }

    function editRecip(): void {
        const sectionId = isBrowse ? sections[0].id : item.sectionId
        navigation.navigate('EditRecipeTabs', {
            screen: 'EditRecipeStack',
            params: {
                screen: 'EditRecipe',
                params: {
                    sectionId,
                    recipeId: item.id,
                    browse: isBrowse,
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

    const dropdownItems = []

    if (!isBrowse || sections.length > 0) {
        dropdownItems.push({
            text: isBrowse ? 'Copy' : 'Edit',
            onPress: editRecip,
        })
    }

    if (!isBrowse) {
        dropdownItems.push({
            text: 'Delete',
            onPress: deleteRecip,
        })
    }

    const editPeopleCount =
        editable &&
        typeof incrementPeopleCount !== 'undefined' &&
        typeof decrementPeopleCount !== 'undefined'

    const prepareTimeHours = Math.floor(item.prepareTime / 60)
    const prepareTimeMinutes = item.prepareTime - prepareTimeHours * 60

    return (
        <ListItem
            items={
                useDropdown
                    ? dropdownItems.map((item, index) => ({
                          id: index,
                          ...item,
                      }))
                    : undefined
            }
            onPress={!editable ? onPress : undefined}
            onGesture={onGesture}
            hide={hide}
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
                    maxLength={1023}
                    placeholder="Description"
                />
                <PropertyRow>
                    <Property
                        iconType={Icons.MyMaterialCommunityIcons}
                        iconName="timer-sand"
                        text={`${prepareTimeHours}:${
                            prepareTimeMinutes < 10 ? '0' : ''
                        }${prepareTimeMinutes}`}
                    />

                    {editPeopleCount ? (
                        <Counter
                            increment={incrementPeopleCount}
                            decrement={decrementPeopleCount}
                            value={item.peopleCount}
                            iconType={Icons.MyMaterialIcons}
                            iconName="person"
                            onChange={changePeopleCount}
                        />
                    ) : (
                        <Property
                            iconType={Icons.MyMaterialIcons}
                            iconName="person"
                            text={item.peopleCount}
                        />
                    )}

                    {item.publishedAt !== null ? (
                        <Property
                            iconType={Icons.MyMaterialIcons}
                            iconName="published-with-changes"
                        />
                    ) : null}
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
    text?: string | number
}): JSX.Element => {
    return (
        <PropertyContainer paddingVertical="s" width="s">
            <Icon type={iconType} name={iconName} />
            {text ? <Text type="SubHeader">{text}</Text> : null}
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
