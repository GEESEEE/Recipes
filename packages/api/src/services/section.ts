import { inject, injectable } from 'inversify'
import { In, Repository } from 'typeorm'
import {
    fitToClass,
    SectionCreate,
    SectionUpdate,
    WithoutId,
} from '@recipes/api-types/v1'
import { TYPES } from '@/utils/constants'
import { Section } from '@/entities'
import { SectionResult } from '@/types'

@injectable()
export default class SectionService {
    @inject(TYPES.SectionRepository)
    private readonly sectionRepository!: Repository<Section>

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

    public async getSectionsById(
        sectionIds: number[]
    ): Promise<SectionResult[]> {
        const sections = await this.sectionRepository.find({
            where: {
                id: In(sectionIds),
            },
        })
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
