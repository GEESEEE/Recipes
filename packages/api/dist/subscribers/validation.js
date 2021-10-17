"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSubscriber = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const validation_1 = (0, tslib_1.__importDefault)(require("../errors/validation"));
let ValidationSubscriber = class ValidationSubscriber {
    async beforeInsert(event) {
        const errors = await (0, class_validator_1.validate)(event.entity);
        if (errors.length > 0) {
            throw new validation_1.default(errors);
        }
    }
    async beforeUpdate(event) {
        const errors = await (0, class_validator_1.validate)(event.entity);
        if (errors.length > 0) {
            throw new validation_1.default(errors);
        }
    }
};
ValidationSubscriber = (0, tslib_1.__decorate)([
    (0, typeorm_1.EventSubscriber)()
], ValidationSubscriber);
exports.ValidationSubscriber = ValidationSubscriber;
