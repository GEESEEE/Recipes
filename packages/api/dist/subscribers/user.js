"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscriber = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const bcrypt_1 = (0, tslib_1.__importDefault)(require("bcrypt"));
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
const constants_1 = require("../util/constants");
const config_1 = require("../config");
const inversify_inject_decorators_1 = (0, tslib_1.__importDefault)(require("inversify-inject-decorators"));
const { lazyInject } = (0, inversify_inject_decorators_1.default)(config_1.container);
let UserSubscriber = class UserSubscriber {
    listenTo() {
        return entities_1.User;
    }
    beforeInsert(event) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            event.entity.password = yield this.hashPassword(event.entity.password);
        });
    }
    beforeUpdate(event) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (typeof event.entity === 'undefined') {
                return;
            }
            const newPassword = event.updatedColumns.find((column) => column.propertyName === 'password');
            if (typeof newPassword !== 'undefined') {
                event.entity.password = yield this.hashPassword(event.entity.password);
            }
        });
    }
    // TODO: Test if deleteUncopiedRecipesFromAuthor works correctly
    BeforeRemove(event) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const queryBuilder = this.recipeRepository.queryBuilder();
            yield queryBuilder.deleteUncopiedRecipesFromAuthor(event.entityId);
        });
    }
    hashPassword(password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt();
            return yield bcrypt_1.default.hash(password, salt);
        });
    }
};
(0, tslib_1.__decorate)([
    lazyInject(constants_1.TYPES.RecipeRepository),
    (0, tslib_1.__metadata)("design:type", repositories_1.RecipeRepository)
], UserSubscriber.prototype, "recipeRepository", void 0);
UserSubscriber = (0, tslib_1.__decorate)([
    (0, typeorm_1.EventSubscriber)()
], UserSubscriber);
exports.UserSubscriber = UserSubscriber;
