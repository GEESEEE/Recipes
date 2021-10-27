import { inject, injectable } from 'inversify'
import { fitToClass, SectionCreate, SectionUpdate } from '@recipes/api-types/v1'
import { TYPES } from '@/utils/constants'
import { SectionResult, SectionScopeArgs, SectionScopes } from '@/types'
import { SectionRepository } from '@/repositories'
import { Section } from '@/entities'

@injectable()
export default class SectionService {
    @inject(TYPES.SectionRepository)
    private readonly sectionRepository!: SectionRepository

    public async createSections(
        sectionObjects: Array<SectionCreate>
    ): Promise<SectionResult[]> {
        const sections = await this.sectionRepository.save(
            sectionObjects.map((section) =>
                this.sectionRepository.create(section)
            )
        )
        return sections.map((section) => fitToClass(section, SectionResult))
    }

    public async getSection(
        sectionId: number
    ): Promise<SectionResult | undefined> {
        const section = await this.sectionRepository.findOne(sectionId)
        if (typeof section !== 'undefined') {
            return fitToClass(section, SectionResult)
        }
        return section
    }

    public async getSections(
        scopes: SectionScopes[],
        args: SectionScopeArgs
    ): Promise<Section[]> {
        let qb = this.sectionRepository.queryBuilder(args)

        qb = qb.validate({ scopes })

        return await qb.finish().getMany()
    }

    public async getSectionResults(
        scopes: SectionScopes[],
        args: SectionScopeArgs
    ): Promise<SectionResult[]> {
        const sections = await this.getSections(scopes, args)

        return sections.map((section) => fitToClass(section, SectionResult))
    }

    public async getSectionsFromUser(userId: number): Promise<SectionResult[]> {
        const sections = await this.sectionRepository.find({
            where: { userId },
            order: { position: 'ASC' },
        })
        return sections.map((section) => fitToClass(section, SectionResult))
    }

    public async updateSection(section: SectionUpdate): Promise<SectionResult> {
        const saved = await this.sectionRepository.save(section)
        return fitToClass(saved, SectionResult)
    }

    public async updateSections(
        sections: Array<SectionUpdate>
    ): Promise<Array<SectionResult>> {
        const saved = await this.sectionRepository.save(sections)
        return saved.map((sect) => fitToClass(sect, SectionResult))
    }

    public async deleteSection(sectionId: number): Promise<boolean> {
        const result = await this.sectionRepository.delete(sectionId)
        return result.affected !== 0
    }
}
