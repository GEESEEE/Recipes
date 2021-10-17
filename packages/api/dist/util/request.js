"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSortQuery = exports.decodeQueryParams = void 0;
function decodeQueryParams(param = '') {
    const result = param.split(',').filter((value) => value !== '');
    return result.length > 0 ? result : undefined;
}
exports.decodeQueryParams = decodeQueryParams;
function decodeSortQuery(param = '') {
    const result = param
        .split(',')
        .filter((value) => value !== '')
        .map((sort) => {
        if (sort.charAt(0) === '-') {
            return [sort.substring(1), 'DESC'];
        }
        else {
            return [sort, 'ASC'];
        }
    });
    return result.length > 0 ? result : undefined;
}
exports.decodeSortQuery = decodeSortQuery;
