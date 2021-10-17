"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSubscriber = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const constants_1 = require("../util/constants");
const config_1 = require("../config");
const inversify_inject_decorators_1 = (0, tslib_1.__importDefault)(require("inversify-inject-decorators"));
const { lazyInject } = (0, inversify_inject_decorators_1.default)(config_1.container);
let SettingsSubscriber = class SettingsSubscriber {
    redis;
    userRepository;
    listenTo() {
        return entities_1.Settings;
    }
    async afterUpdate(event) {
        console.log('After Settings update', event.entity);
        const user = (await this.userRepository.findOne({
            where: { settingsId: event.entity.id },
            select: ['id'],
        }));
        const redisUser = JSON.parse((await this.redis.get(user.id)));
        redisUser.settings = { ...redisUser.settings, ...event.entity };
        await this.redis.set(user.id, JSON.stringify(redisUser));
    }
};
(0, tslib_1.__decorate)([
    lazyInject(constants_1.TYPES.Redis),
    (0, tslib_1.__metadata)("design:type", Object)
], SettingsSubscriber.prototype, "redis", void 0);
(0, tslib_1.__decorate)([
    lazyInject(constants_1.TYPES.UserRepository),
    (0, tslib_1.__metadata)("design:type", typeorm_1.Repository)
], SettingsSubscriber.prototype, "userRepository", void 0);
SettingsSubscriber = (0, tslib_1.__decorate)([
    (0, typeorm_1.EventSubscriber)()
], SettingsSubscriber);
exports.SettingsSubscriber = SettingsSubscriber;
