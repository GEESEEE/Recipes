"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeSubscriber = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
let RecipeSubscriber = class RecipeSubscriber {
    listenTo() {
        return entities_1.Recipe;
    }
    beforeInsert(event) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.unpublishCopies(event.entity);
        });
    }
    beforeUpdate(event) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (typeof event.entity !== 'undefined') {
                this.unpublishCopies(event.entity);
            }
        });
    }
    unpublishCopies(recipe) {
        if (recipe.copyOf != null) {
            recipe.publishedAt = null;
        }
    }
};
RecipeSubscriber = (0, tslib_1.__decorate)([
    (0, typeorm_1.EventSubscriber)()
], RecipeSubscriber);
exports.RecipeSubscriber = RecipeSubscriber;
