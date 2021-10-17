"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../config");
const express_1 = (0, tslib_1.__importDefault)(require("./express"));
const passport_1 = (0, tslib_1.__importDefault)(require("./passport"));
const oauth2orize_1 = (0, tslib_1.__importDefault)(require("./oauth2orize"));
const typeorm_1 = require("typeorm");
function init() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        yield (0, typeorm_1.createConnection)();
        (0, passport_1.default)(config_1.container);
        (0, oauth2orize_1.default)(config_1.container);
        const app = (0, express_1.default)(config_1.container);
        return app;
    });
}
exports.init = init;
