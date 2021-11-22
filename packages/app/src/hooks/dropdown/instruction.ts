import { Instruction } from '@recipes/api-types/v1'
import { useNavigation } from '@react-navigation/core'
import { useAppDispatch } from '../redux'
import { DropdownItem } from '@/types'
import { editRecipeActions } from '@/redux'

export function useInstructionDropdownItems(
    instruction: Instruction
): DropdownItem[] {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()

    function editInstruction(): void {
        navigation.navigate('EditInstruction', {
            instructionId: instruction.id,
        })
    }

    function deleteInstruction(): void {
        dispatch(editRecipeActions.removeInstruction({ id: instruction.id }))
    }

    const dropdownItems = [
        {
            text: 'Edit',
            onPress: editInstruction,
        },
        {
            text: 'Delete',
            onPress: deleteInstruction,
        },
    ]

    return dropdownItems.map((item, index) => ({
        id: index,
        ...item,
    }))
}
