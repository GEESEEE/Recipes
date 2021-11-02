import React from 'react'
import styled from 'styled-components'
import { useNavigationState, useRoute } from '@react-navigation/native'
import {
    useAppDispatch,
    useAppSelector,
    useHeader,
    useUpdateEffect,
} from '@/hooks'
import { View, Text, TextInput } from '@/components/base'
import { TextInputWithTitle, Button } from '@/components/atoms'
import { editRecipeActions } from '@/redux'

function EditRecipeScreen({ navigation }: { navigation: any }): JSX.Element {
    const { settings, editRecipe, recipes } = useAppSelector((state) => state)
    const { theme } = settings
    const dispatch = useAppDispatch()

    const route = useRoute() as {
        params?: { sectionId: number; recipeId: number }
    }

    let sectionId = -1
    let recipeId = -1
    if (typeof route.params !== 'undefined') {
        recipeId = route.params.recipeId
        sectionId = route.params.sectionId
    }

    React.useEffect(() => {
        if (sectionId >= 0 && recipeId >= 0) {
            const sectionRecipes = recipes[sectionId]
            if (typeof sectionRecipes !== 'undefined') {
                const recipe = sectionRecipes.find(
                    (recipe) => recipe.id === recipeId
                )
                if (typeof recipe !== 'undefined') {
                    dispatch(editRecipeActions.setRecipe(recipe))
                }
            }
        }
    }, [recipeId, dispatch, sectionId, recipes])

    useHeader(navigation, { right: [] })

    const prepareTimeHours = Math.floor(editRecipe.prepareTime / 60)
    const prepareTimeMinutes = editRecipe.prepareTime - prepareTimeHours * 60

    const width = 'l'
    const paddingHorizontal = 'm'
    const marginVertical = 's'

    const prepareTimeText = 'Prepare time'
    const peopleCountText = 'People count'

    return (
        <Container backgroundColor={theme.background} paddingVertical="s">
            <TextInputWithTitle
                title="Title"
                type="SubHeader"
                onChangeText={(t: string) => console.log('')}
                multiline
                value={editRecipe.name}
            />

            <TextInputWithTitle
                title="Description"
                onChangeText={(t: string) => console.log('')}
                multiline
                value={editRecipe.description}
            />

            <PrepareTimeContainer
                width={width}
                paddingHorizontal={paddingHorizontal}
                marginVertical={marginVertical}
            >
                <PrepareTimeText>{prepareTimeText}</PrepareTimeText>
                <TextInputWithTitle
                    value={prepareTimeHours.toString()}
                    marginHorizontal="s"
                    title="Hours"
                    onChangeText={(t: string) => console.log('')}
                    width="s"
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TextInputWithTitle
                    value={prepareTimeMinutes.toString()}
                    title="Minutes"
                    onChangeText={(t: string) => console.log('')}
                    width="s"
                    keyboardType="numeric"
                    maxLength={2}
                />
            </PrepareTimeContainer>

            <PrepareTimeContainer
                width={width}
                paddingHorizontal={paddingHorizontal}
                marginVertical={marginVertical}
            >
                <PrepareTimeText>{peopleCountText}</PrepareTimeText>
                <TextInputWithTitle
                    value={editRecipe.peopleCount.toString()}
                    placeholder="People count"
                    width="m"
                    marginHorizontal="s"
                    keyboardType="numeric"
                />
            </PrepareTimeContainer>
        </Container>
    )
}

export default EditRecipeScreen

const Container = styled(View)`
    flex: 1;
    align-items: center;
`

const PrepareTimeContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`

const PrepareTimeText = styled(Text)`
    flex: 1;
`

const PeopleCountContainer = styled(View)``
