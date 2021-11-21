import { useNavigation } from '@react-navigation/native'
import { Recipe } from '@recipes/api-types/v1'
import { useAppDispatch } from '../redux'
import { useReport, useSections } from '../selectors'
import { recipesActions, recipeService } from '@/redux'
import { DropdownItem } from '@/types'

export function useRecipeDropdownItems(
    recipe: Recipe,
    isBrowse: boolean
): DropdownItem[] {
    const navigation = useNavigation<any>()
    const dispatch = useAppDispatch()
    const sections = useSections()
    const report = useReport()

    const [deleteRecipe] = recipeService.useDeleteRecipeMutation()

    function editRecipe() {
        const sectionId = isBrowse ? sections[0].id : recipe.sectionId
        navigation.navigate('EditRecipeTabs', {
            screen: 'EditRecipeStack',
            params: {
                screen: 'EditRecipe',
                params: {
                    sectionId,
                    recipeId: recipe.id,
                    browse: isBrowse,
                },
            },
        })
    }

    async function deleteRecip(): Promise<void> {
        if (recipe.sectionId !== null) {
            const args = { sectionId: recipe.sectionId, recipeId: recipe.id }
            const res = await deleteRecipe(args)
            if ('data' in res) {
                dispatch(recipesActions.removeRecipe(args))
            }
        }
    }

    async function reportRecipe() {
        navigation.navigate('ReportRecipe', { recipeId: recipe.id })
    }

    const dropdownItems = []

    if (!isBrowse || sections.length > 0) {
        dropdownItems.push({
            text: isBrowse ? 'Copy' : 'Edit',
            onPress: editRecipe,
        })
    }

    if (!isBrowse) {
        dropdownItems.push({
            text: 'Delete',
            onPress: deleteRecip,
        })
    }

    const alreadyReported =
        typeof report.find((report) => report.recipeId === recipe.id) !==
        'undefined'

    if (isBrowse && !alreadyReported) {
        dropdownItems.push({
            text: 'Report',
            onPress: reportRecipe,
        })
    }

    return dropdownItems.map((item, index) => ({
        id: index,
        ...item,
    }))
}
