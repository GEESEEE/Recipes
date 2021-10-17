"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const application_1 = (0, tslib_1.__importDefault)(require("./application"));
const user_1 = (0, tslib_1.__importDefault)(require("./user"));
let Token = class Token {
    id;
    token;
    createdAt;
    revokedAt;
    applicationId;
    application;
    userId;
    user;
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Token.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 1023, unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], Token.prototype, "token", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('timestamp with time zone', {
        name: 'created_at',
        default: () => 'NOW()',
    }),
    (0, tslib_1.__metadata)("design:type", Date)
], Token.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('timestamp with time zone', { name: 'revoked_at', nullable: true }),
    (0, tslib_1.__metadata)("design:type", Object)
], Token.prototype, "revokedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'application_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], Token.prototype, "applicationId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => application_1.default, (application) => application.tokens, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    (0, tslib_1.__metadata)("design:type", application_1.default)
], Token.prototype, "application", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], Token.prototype, "userId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => user_1.default, (user) => user.tokens, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    (0, tslib_1.__metadata)("design:type", user_1.default)
], Token.prototype, "user", void 0);
Token = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('token')
], Token);
exports.default = Token;
