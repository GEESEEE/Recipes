"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const entities_1 = require("../entities");
class CreateApplication {
    run(_factory, connection) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const applicationRepository = yield connection.getRepository(entities_1.Application);
            yield applicationRepository.save({
                name: 'RecipesApp',
                uid: '11a8fa16-ca02-4a7e-bbd8-5aa4bd92a8ef',
                secret: '',
                scopes: '',
                redirectUri: '',
                confidential: true,
            });
        });
    }
}
exports.default = CreateApplication;
