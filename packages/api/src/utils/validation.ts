import { fitToClass, ModifyError, RequestError } from '@recipes/api-types/v1'
import { inject, injectable } from 'inversify'
import { TYPES } from './constants'
import { NotFoundError, ForbiddenError } from '@/errors'
import { RecipeResult, SectionResult } from '@/types'
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
            if ('statusCode' in result) {
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
            if (typeof section === 'undefined') {
                return this.toError('Section', id, RequestError.NOT_FOUND)
            }
            if (section.userId !== userId) {
                return this.toError('Section', id, RequestError.FORBIDDEN)
            }
            return section
        })

        return res
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

        if (section.userId !== userId) {
            return [this.toError('Section', section.id, RequestError.FORBIDDEN)]
        }

        const res = recipeIds.map((id) => {
            const recipe = section.recipes?.find((rec) => rec.id === id)
            if (typeof recipe === 'undefined') {
                return this.toError('Recipe', id, RequestError.NOT_FOUND)
            }
            return recipe
        })

        return res.map((item) => {
            if ('statusCode' in item) {
                return item
            }
            return fitToClass(item as RecipeResult, RecipeResult)
        })
    }
}
