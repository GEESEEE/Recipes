import React from 'react'
import styled from 'styled-components'
import { useRoute } from '@react-navigation/native'
import { Recipe } from '@recipes/api-types/v1'
import {
    useAppDispatch,
    useEditRecipe,
    useHeader,
    useRecipes,
    useSettings,
} from '@/hooks'
import { View, Text, Icons } from '@/components/base'
import { TextInputWithTitle, Counter } from '@/components/atoms'
import { editRecipeActions } from '@/redux'
import { utils } from '@/utils'

const emptyRecipe = new Recipe()
emptyRecipe.instructions = []
emptyRecipe.recipeIngredients = []

function EditRecipeScreen({ navigation }: { navigation: any }): JSX.Element {
    const settings = useSettings()
    const editRecipe = useEditRecipe()
    const recipes = useRecipes()
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
        console.log('Edit Recipe Use effect', sectionId, recipeId)
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
        } else {
            dispatch(editRecipeActions.setRecipe({ ...emptyRecipe }))
        }
    }, [recipeId, dispatch, sectionId, recipes])

    const prepareTimeHours = Math.floor(editRecipe.prepareTime / 60)
    const prepareTimeMinutes = editRecipe.prepareTime - prepareTimeHours * 60

    function handlePrepareTimeHours(text: string): void {
        const hours = utils.handleNumericTextInput(text, true)
        const newTime = hours * 60 + prepareTimeMinutes
        dispatch(editRecipeActions.setPrepareTime(newTime))
    }

    function handlePrepareTimeMinutes(text: string): void {
        const minutes = utils.handleNumericTextInput(text, true)
        const newTime = prepareTimeHours * 60 + minutes
        dispatch(editRecipeActions.setPrepareTime(newTime))
    }

    function incrementPeopleCount(): void {
        dispatch(editRecipeActions.setPeopleCount(editRecipe.peopleCount + 1))
    }

    function decrementPeopleCount(): void {
        dispatch(editRecipeActions.setPeopleCount(editRecipe.peopleCount - 1))
    }

    useHeader(navigation, {
        right: [
            {
                type: Icons.MyFeather,
                name: 'save',
                onPress: () => console.log('Saving Recipe'),
            },
        ],
    })

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
                onChangeText={(t: string) =>
                    dispatch(editRecipeActions.setName(t))
                }
                multiline
                value={editRecipe.name}
            />

            <TextInputWithTitle
                title="Description"
                onChangeText={(t: string) =>
                    dispatch(editRecipeActions.setDescription(t))
                }
                multiline
                value={editRecipe.description}
            />

            <RowContainer
                width={width}
                paddingHorizontal={paddingHorizontal}
                marginVertical={marginVertical}
            >
                <FlexText>{prepareTimeText}</FlexText>
                <TextInputWithTitle
                    value={prepareTimeHours.toString()}
                    marginHorizontal="s"
                    title="Hours"
                    onChangeText={(t: string) => handlePrepareTimeHours(t)}
                    width="s"
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TextInputWithTitle
                    value={prepareTimeMinutes.toString()}
                    title="Minutes"
                    onChangeText={(t: string) => handlePrepareTimeMinutes(t)}
                    width="s"
                    keyboardType="numeric"
                    maxLength={2}
                />
            </RowContainer>

            <RowContainer
                width={width}
                paddingHorizontal={paddingHorizontal}
                marginVertical={marginVertical}
            >
                <FlexText>{peopleCountText}</FlexText>
                <Counter
                    width="s"
                    marginHorizontal="s"
                    increment={incrementPeopleCount}
                    decrement={decrementPeopleCount}
                    value={editRecipe.peopleCount}
                />
                <View width="s" />
            </RowContainer>
        </Container>
    )
}

export default EditRecipeScreen

const Container = styled(View)`
    flex: 1;
    align-items: center;
`

const RowContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`

const FlexText = styled(Text)`
    flex: 1;
`
