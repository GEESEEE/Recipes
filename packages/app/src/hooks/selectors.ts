import { RecipeSortOptions, Sort } from '@recipes/api-types/v1'
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

export function useBrowse() {
    return useAppSelector((state) => state.browse)
}

export function useSort() {
    return useAppSelector((state) => state.sort)
}

export function useSortState(): Sort<RecipeSortOptions>[] {
    const sort = useSort()

    return sort.order.map((s) => {
        return (sort.state[s] ? s : `-${s}`) as Sort<RecipeSortOptions>
    })
}

export function useReport() {
    return useAppSelector((state) => state.report)
}
