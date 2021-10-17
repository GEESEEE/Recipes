"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const constants_1 = require("../util/constants");
let SectionService = class SectionService {
    sectionRepository;
    async createSections(sectionObjects) {
        const sections = await this.sectionRepository.save(sectionObjects.map(section => this.sectionRepository.create(section)));
        return sections;
    }
    async getSection(sectionId) {
        return await this.sectionRepository.findOne(sectionId);
    }
    async getSectionsFromUser(userId) {
        const sections = await this.sectionRepository.find({
            where: { userId }
        });
        return sections;
    }
    async updateSection(section, { name, description }) {
        section.name = name ?? section.name;
        section.description = description ?? section.description;
        return await this.sectionRepository.save(section);
    }
    async deleteSection(sectionId) {
        const result = await this.sectionRepository.delete(sectionId);
        return result.affected !== 0;
    }
};
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(constants_1.TYPES.SectionRepository),
    (0, tslib_1.__metadata)("design:type", typeorm_1.Repository)
], SectionService.prototype, "sectionRepository", void 0);
SectionService = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], SectionService);
exports.default = SectionService;
