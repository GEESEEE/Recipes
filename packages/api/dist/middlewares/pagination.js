"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const base_1 = require("../repositories/base");
let PaginationMiddleware = class PaginationMiddleware extends inversify_express_utils_1.BaseMiddleware {
    handler(req, _res, next) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            base_1.BaseQueryBuilder.prototype.paginate = function (perPage) {
                return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                    const currentPage = getPage(req);
                    const pageSize = typeof perPage === 'undefined'
                        ? getPerPage(req)
                        : getPerPage(req, perPage);
                    return yield this.pagination(currentPage, pageSize);
                });
            };
            return next();
        });
    }
};
PaginationMiddleware = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], PaginationMiddleware);
exports.default = PaginationMiddleware;
function getPage(req, defaultPage = 1) {
    if (typeof req.query.page !== 'undefined') {
        return parseInt(req.query.page);
    }
    return defaultPage;
}
function getPerPage(req, defaultPerPage = 15) {
    if (req.query.per_page != null) {
        return parseInt(req.query.per_page);
    }
    return defaultPerPage;
}
