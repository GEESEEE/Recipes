"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
class CreateApplication {
    async run(_factory, connection) {
        const applicationRepository = await connection.getRepository(entities_1.Application);
        await applicationRepository.save({
            name: 'RecipesApp',
            uid: '11a8fa16-ca02-4a7e-bbd8-5aa4bd92a8ef',
            secret: '',
            scopes: '',
            redirectUri: '',
            confidential: true,
        });
    }
}
exports.default = CreateApplication;
