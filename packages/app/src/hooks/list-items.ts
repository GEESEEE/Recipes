import { useSettings } from './selectors'
import { Spacing, Typography } from '@/styles'

const baseOffset = 16

export function useRecipeHeight(): number {
    const { textSize } = useSettings()
    return (
        baseOffset +
        Typography.lineHeight('SubHeader', textSize) +
        2 * Typography.lineHeight('Text', textSize) +
        Spacing.standardIconSize[textSize] +
        8
    )
}

export function useSectionHeight(): number {
    const { textSize } = useSettings()
    return (
        baseOffset +
        Typography.lineHeight('SubHeader', textSize) +
        2 * Typography.lineHeight('Text', textSize)
    )
}

export function useInstructionHeight(): number {
    const { textSize } = useSettings()
    return baseOffset + 2 * Typography.lineHeight('Text', textSize)
}

export function useIngredientHeight(): number {
    const { textSize } = useSettings()
    return baseOffset + 2 * Typography.lineHeight('Text', textSize)
}
