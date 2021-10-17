import { Section } from "../entities";
export default class SectionService {
    private readonly sectionRepository;
    createSections(sectionObjects: Array<{
        name: string;
        description: string;
        userId: number;
    }>): Promise<Section[]>;
    getSection(sectionId: number): Promise<Section | undefined>;
    getSectionsFromUser(userId: number): Promise<Section[]>;
    updateSection(section: Section, { name, description }: {
        name?: string;
        description?: string;
    }): Promise<Section>;
    deleteSection(sectionId: number): Promise<boolean>;
}
