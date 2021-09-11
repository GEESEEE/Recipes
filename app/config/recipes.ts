import { RecipeSortType } from '../actions/sort'
import { Recipe } from '../data'

export function applySearch(
    recipes: Recipe[],
    search: string | undefined
): Recipe[] {
    if (typeof search !== 'undefined' && search.length > 0) {
        const query = search.toLowerCase()

        return recipes.filter((recipe) => {
            if (recipe.name.toLowerCase().includes(query)) return true
            if (recipe.description.toLowerCase().includes(query)) return true

            let included = false
            recipe.recipeIngredients!.forEach((ingr) => {
                if (ingr.ingredient!.name.toLowerCase().includes(query))
                    included = true
            })
            return included
        })
    }
    return recipes
}

const sortFieldMap: { [key in RecipeSortType]: keyof Recipe } = {
    publishtime: 'publishedAt',
    preparetime: 'prepareTime',
    peoplecount: 'peopleCount',
    ingredientcount: 'recipeIngredients',
    instructioncount: 'instructions',
}

const recipeFieldSorter = (fields: string[]) => (r1: Recipe, r2: Recipe) =>
    fields
        .map((field) => {
            let dir = 1
            if (field[0] === '-') {
                dir = -1
                field = field.substring(1)
            }

            const r1Value = r1[field as keyof Recipe]
            const r2Value = r2[field as keyof Recipe]

            if (r1Value == null) return 0
            if (r2Value == null) return 0

            if (r1Value instanceof Array && r2Value instanceof Array) {
                return r1Value.length > r2Value.length
                    ? dir
                    : r1Value.length < r2Value.length
                    ? -dir
                    : 0
            }

            return r1Value > r2Value ? dir : r1Value < r2Value ? -dir : 0
        })
        .reduce((p, n) => p || n, 0)

export function applySort(recipes: Recipe[], sort: string[]): Recipe[] {
    if (sort.length > 0) {
        const fields = sort.map((s) => {
            const reverse = s.charAt(0) === '-'
            const field =
                sortFieldMap[(reverse ? s.substring(1) : s) as RecipeSortType]
            return reverse ? `-${field}` : field
        })
        return recipes.sort(recipeFieldSorter(fields))
    }
    return recipes
}
