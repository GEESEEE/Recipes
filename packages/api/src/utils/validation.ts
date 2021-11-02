import { fitToClass, ModifyError, RequestError } from '@recipes/api-types/v1'
import { inject, injectable } from 'inversify'
import { TYPES } from './constants'
import { NotFoundError, ForbiddenError } from '@/errors'
import {
    InstructionResult,
    RecipeIngredientResult,
    RecipeResult,
    SectionResult,
} from '@/types'
import { SectionService } from '@/services'

@injectable()
export default class Validator {
    @inject(TYPES.SectionService)
    private readonly sectionsService!: SectionService

    public validateError(error: ModifyError): ModifyError {
        switch (error.statusCode) {
            case RequestError.NOT_FOUND:
                throw new NotFoundError(error.statusMessage)

            case RequestError.FORBIDDEN:
                throw new ForbiddenError(error.statusMessage)

            default:
                break
        }
        return error
    }

    public isError<T>(item: T | ModifyError): item is ModifyError {
        return 'statusCode' in item
    }

    private toError(
        objectName: string,
        id: number,
        error: RequestError
    ): ModifyError {
        let statusMessage = `${objectName} with id ${id}`
        switch (error) {
            case RequestError.NOT_FOUND:
                statusMessage += `was not found`
                break

            case RequestError.FORBIDDEN:
                statusMessage += `does not belong to requesting user`
                break
        }

        return {
            id,
            statusCode: error,
            statusMessage,
        }
    }

    public splitResults<T>(arr: Array<T | ModifyError>): [T[], ModifyError[]] {
        const newArr: T[] = []
        const errors: ModifyError[] = []
        arr.forEach((result) => {
            if (this.isError(result)) {
                errors.push(result)
            } else {
                newArr.push(result)
            }
        })
        return [newArr, errors]
    }

    public async validateSections(
        userId: number,
        sectionIds: number[]
    ): Promise<Array<SectionResult | ModifyError>> {
        const sections = await this.sectionsService.getSectionResults(['ids'], {
            sectionIds,
        })

        const res = sectionIds.map((id) => {
            const section = sections.find((s) => s.id === id)
            return this.validateSection(userId, section, id)
        })

        return res
    }

    public validateSection(
        userId: number,
        section: SectionResult | undefined,
        id: number
    ): ModifyError | SectionResult {
        if (typeof section === 'undefined') {
            return this.toError('Section', id, RequestError.NOT_FOUND)
        }
        if (section.userId !== userId) {
            return this.toError('Section', id, RequestError.FORBIDDEN)
        }
        return section
    }

    public async validateRecipes(
        userId: number,
        sectionId: number,
        recipeIds: number[]
    ): Promise<Array<RecipeResult | ModifyError>> {
        const section = (
            await this.sectionsService.getSections(['ids', 'recipes'], {
                sectionIds: [sectionId],
                recipeIds,
            })
        )[0]

        const validatedSection = this.validateSection(
            userId,
            section,
            sectionId
        )
        if (this.isError(validatedSection)) {
            return [validatedSection]
        }

        const res = recipeIds.map((id) => {
            const recipe = section.recipes?.find((rec) => rec.id === id)
            if (typeof recipe === 'undefined') {
                return this.toError('Recipe', id, RequestError.NOT_FOUND)
            }
            return recipe
        })

        return res.map((item) => {
            if (this.isError(item)) {
                return item
            }
            return fitToClass(item as RecipeResult, RecipeResult)
        })
    }

    public async validateInstructions(
        userId: number,
        sectionId: number,
        recipeId: number,
        instructionIds: number[]
    ): Promise<Array<InstructionResult | ModifyError>> {
        const section = (
            await this.sectionsService.getSections(['ids', 'recipes'], {
                sectionIds: [sectionId],
                recipeIds: [recipeId],
            })
        )[0]

        const validatedSection = this.validateSection(
            userId,
            section,
            sectionId
        )
        if (this.isError(validatedSection)) {
            return [validatedSection]
        }

        const recipe = section.recipes?.[0]
        if (typeof recipe === 'undefined') {
            return [this.toError('Recipe', recipeId, RequestError.NOT_FOUND)]
        }

        const res = instructionIds.map((id) => {
            const instruction = recipe.instructions?.find(
                (instr) => instr.id === id
            )
            if (typeof instruction === 'undefined') {
                return this.toError('Instruction', id, RequestError.NOT_FOUND)
            }
            return instruction
        })

        return res.map((item) => {
            if (this.isError(item)) {
                return item
            }
            return fitToClass(item, InstructionResult)
        })
    }

    public async validateIngredients(
        userId: number,
        sectionId: number,
        recipeId: number,
        ingredientIds: number[]
    ): Promise<Array<RecipeIngredientResult | ModifyError>> {
        const section = (
            await this.sectionsService.getSections(['ids', 'recipes'], {
                sectionIds: [sectionId],
                recipeIds: [recipeId],
            })
        )[0]

        const validatedSection = this.validateSection(
            userId,
            section,
            sectionId
        )
        if (this.isError(validatedSection)) {
            return [validatedSection]
        }

        const recipe = section.recipes?.[0]
        if (typeof recipe === 'undefined') {
            return [this.toError('Recipe', recipeId, RequestError.NOT_FOUND)]
        }

        const res = ingredientIds.map((id) => {
            const ingredient = recipe.recipeIngredients?.find(
                (ingr) => ingr.id === id
            )
            if (typeof ingredient === 'undefined') {
                return this.toError('Ingredient', id, RequestError.NOT_FOUND)
            }
            return ingredient
        })

        return res.map((item) => {
            if (this.isError(item)) {
                return item
            }
            return fitToClass(
                item as RecipeIngredientResult,
                RecipeIngredientResult
            )
        })
    }
}
