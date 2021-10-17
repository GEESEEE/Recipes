"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("@zchapple/typeorm-seeding");
const entities_1 = require("../entities");
(0, typeorm_seeding_1.define)(entities_1.Settings, (_faker) => {
    const settings = new entities_1.Settings();
    return settings;
});
