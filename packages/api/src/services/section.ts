import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'
import { Section } from '../entities'
import { TYPES } from '../util/constants'

@injectable()
export default class SectionService {
    @inject(TYPES.SectionRepository)
    private readonly sectionRepository!: Repository<Section>

    public async createSections(
        sectionObjects: Array<{
            name: string
            description: string
            userId: number
        }>
    ): Promise<Section[]> {
        const sections = await this.sectionRepository.save(
            sectionObjects.map((section) =>
                this.sectionRepository.create(section)
            )
        )
        return sections
    }

    public async getSection(sectionId: number): Promise<Section | undefined> {
        return await this.sectionRepository.findOne(sectionId)
    }

    public async getSectionsFromUser(userId: number): Promise<Section[]> {
        const sections = await this.sectionRepository.find({
            where: { userId },
        })
        return sections
    }

    public async updateSection(
        section: Section,
        {
            name,
            description,
        }: {
            name?: string
            description?: string
        }
    ): Promise<Section> {
        section.name = name ?? section.name
        section.description = description ?? section.description

        return await this.sectionRepository.save(section)
    }

    public async deleteSection(sectionId: number): Promise<boolean> {
        const result = await this.sectionRepository.delete(sectionId)
        return result.affected !== 0
    }
}
