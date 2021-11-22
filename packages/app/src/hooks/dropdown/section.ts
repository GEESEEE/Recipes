import { useNavigation } from '@react-navigation/core'
import { Section } from '@recipes/api-types/v1'
import { useAppDispatch } from '../redux'
import { DropdownItem } from '@/types'
import { sectionService, sectionsActions } from '@/redux'

export function useSectionDropdownItems(section: Section): DropdownItem[] {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()

    const [deleteSection] = sectionService.useDeleteSectionMutation()

    async function deleteSect(): Promise<void> {
        const res = await deleteSection(section.id)
        if ('data' in res) {
            dispatch(sectionsActions.removeSection(section.id))
        }
    }

    function editSection(): void {
        navigation.navigate('EditSection', { sectionId: section.id })
    }

    const dropdownItems = [
        {
            text: 'Edit',
            onPress: editSection,
        },
        {
            text: 'Delete',
            onPress: deleteSect,
        },
    ]

    return dropdownItems.map((item, index) => ({
        id: index,
        ...item,
    }))
}
