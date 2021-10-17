"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = exports.getRandomInt = void 0;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
exports.getRandomInt = getRandomInt;
function groupBy(records, key) {
    const result = [];
    const keys = [];
    for (const record of records) {
        const recordKey = record[key];
        if (!keys.includes(recordKey)) {
            keys.push(recordKey);
        }
        const recordGroup = result.find((group) => group[0][key] === recordKey);
        if (typeof recordGroup === 'undefined') {
            result.push([record]);
        }
        else {
            recordGroup.push(record);
        }
    }
    return result;
}
exports.groupBy = groupBy;
