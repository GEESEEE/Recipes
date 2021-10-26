import { ModifyError, RequestError } from '@recipes/api-types/v1'
import { inject, injectable } from 'inversify'
import { TYPES } from './constants'
import { NotFoundError, ForbiddenError } from '@/errors'
import { SectionResult } from '@/types'
import { SectionService } from '@/services'

@injectable()
class Validator {
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

    public async validateSections(
        userId: number,
        sectionIds: number[]
    ): Promise<Array<SectionResult | ModifyError>> {
        const sections = await this.sectionsService.getSectionsById(sectionIds)

        const res = sectionIds.map((id) => {
            const section = sections.find((s) => s.id === id)
            if (typeof section === 'undefined') {
                return {
                    id,
                    statusCode: RequestError.NOT_FOUND,
                    statusMessage: 'Provided sectionId was not found',
                }
            }
            if (section.userId !== userId) {
                return {
                    id,
                    statusCode: RequestError.FORBIDDEN,
                    statusMessage:
                        'Provided section does not belong to the requesting user',
                }
            }
            return section
        })

        return res
    }
}

const validator = new Validator()
Object.freeze(validator)

export default validator
