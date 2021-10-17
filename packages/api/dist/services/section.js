"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const constants_1 = require("../util/constants");
let SectionService = class SectionService {
    createSections(sectionObjects) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const sections = yield this.sectionRepository.save(sectionObjects.map(section => this.sectionRepository.create(section)));
            return sections;
        });
    }
    getSection(sectionId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.sectionRepository.findOne(sectionId);
        });
    }
    getSectionsFromUser(userId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const sections = yield this.sectionRepository.find({
                where: { userId }
            });
            return sections;
        });
    }
    updateSection(section, { name, description }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            section.name = name !== null && name !== void 0 ? name : section.name;
            section.description = description !== null && description !== void 0 ? description : section.description;
            return yield this.sectionRepository.save(section);
        });
    }
    deleteSection(sectionId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const result = yield this.sectionRepository.delete(sectionId);
            return result.affected !== 0;
        });
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
