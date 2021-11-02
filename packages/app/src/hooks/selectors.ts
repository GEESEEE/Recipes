import { useAppSelector } from './redux'
import { sectionsSelector } from '@/redux'

export function useAuth() {
    return useAppSelector((state) => state.auth)
}

export function useSettings() {
    return useAppSelector((state) => state.settings)
}

export function useSections() {
    return useAppSelector((state) => sectionsSelector.selectAll(state.sections))
}

export function useSectionById(sectionId: number) {
    return useAppSelector((state) =>
        sectionsSelector.selectById(state.sections, sectionId)
    )
}

export function useRecipes() {
    return useAppSelector((state) => state.recipes)
}

export function useEditRecipe() {
    return useAppSelector((state) => state.editRecipe)
}
