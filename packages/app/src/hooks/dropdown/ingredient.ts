import { useNavigation } from '@react-navigation/core'
import { RecipeIngredient } from '@recipes/api-types/v1'
import { useAppDispatch } from '../redux'
import { DropdownItem } from '@/types'
import { editRecipeActions } from '@/redux'

export function useIngredientDropdownItems(
    ingredient: RecipeIngredient
): DropdownItem[] {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()

    function editIngredient(): void {
        navigation.navigate('EditIngredient', { ingredientId: ingredient.id })
    }

    function deleteIngredient(): void {
        dispatch(editRecipeActions.removeIngredient({ id: ingredient.id }))
    }

    const dropdownItems = [
        {
            text: 'Edit',
            onPress: editIngredient,
        },
        {
            text: 'Delete',
            onPress: deleteIngredient,
        },
    ]

    return dropdownItems.map((item, index) => ({
        id: index,
        ...item,
    }))
}
