import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'
import { UpdatableFields, fitToClass, Creatable } from '@recipes/api-types/v1'
import { TYPES } from '@/utils/constants'
import { Section } from '@/entities'
import { SectionResult } from '@/types'

@injectable()
export default class SectionService {
    @inject(TYPES.SectionRepository)
    private readonly sectionRepository!: Repository<Section>

    public async createSections(
        sectionObjects: Array<Creatable<SectionResult>>
    ): Promise<SectionResult[]> {
        let sections = await this.sectionRepository.save(
            sectionObjects.map((section) =>
                this.sectionRepository.create(section)
            )
        )
        sections = sections.map((section) => fitToClass(section, SectionResult))
        return sections
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

    public async getSectionsFromUser(userId: number): Promise<SectionResult[]> {
        let sections = await this.sectionRepository.find({
            where: { userId },
        })
        sections = sections.map((section) => fitToClass(section, SectionResult))
        return sections
    }

    public async updateSection(
        section: Section,
        { userId, name, description }: UpdatableFields<SectionResult>
    ): Promise<SectionResult> {
        section.userId = userId ?? section.userId
        section.name = name ?? section.name
        section.description = description ?? section.description

        const saved = await this.sectionRepository.save(section)
        return fitToClass(saved, SectionResult)
    }

    public async deleteSection(sectionId: number): Promise<boolean> {
        const result = await this.sectionRepository.delete(sectionId)
        return result.affected !== 0
    }
}
