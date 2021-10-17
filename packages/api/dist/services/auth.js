"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = exports.OAuthError = void 0;
const tslib_1 = require("tslib");
const fs = (0, tslib_1.__importStar)(require("fs"));
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const bcrypt_1 = (0, tslib_1.__importDefault)(require("bcrypt"));
const jwt = (0, tslib_1.__importStar)(require("jsonwebtoken"));
const constants_1 = require("../util/constants");
const publicKey = fs.readFileSync('public.key', 'utf-8');
const privateKey = fs.readFileSync('private.key', 'utf-8');
var OAuthError;
(function (OAuthError) {
    OAuthError[OAuthError["INVALID_REQUEST"] = 0] = "INVALID_REQUEST";
    OAuthError[OAuthError["INVALID_CLIENT"] = 1] = "INVALID_CLIENT";
    OAuthError[OAuthError["INVALID_GRANT"] = 2] = "INVALID_GRANT";
    OAuthError[OAuthError["UNAUTHORIZED_CLIENT"] = 3] = "UNAUTHORIZED_CLIENT";
    OAuthError[OAuthError["UNSUPPORTED_GRANT_TYPE"] = 4] = "UNSUPPORTED_GRANT_TYPE";
    OAuthError[OAuthError["INVALID_SCOPE"] = 5] = "INVALID_SCOPE";
})(OAuthError = exports.OAuthError || (exports.OAuthError = {}));
var AuthError;
(function (AuthError) {
    AuthError[AuthError["USER_EXISTS"] = 0] = "USER_EXISTS";
    AuthError[AuthError["EMAIL_EXISTS"] = 1] = "EMAIL_EXISTS";
})(AuthError = exports.AuthError || (exports.AuthError = {}));
let AuthService = class AuthService {
    userRepository;
    tokenRepository;
    settingsRepository;
    redis;
    async signUp({ name, password, email, }) {
        let user = await this.userRepository.findOne({ name });
        if (typeof user !== 'undefined') {
            return AuthError.USER_EXISTS;
        }
        user = await this.userRepository.findOne({ email });
        if (typeof user !== 'undefined') {
            return AuthError.EMAIL_EXISTS;
        }
        const settings = await this.settingsRepository.save(this.settingsRepository.create({}));
        user = await this.userRepository.save(this.userRepository.create({
            name,
            password,
            email,
            settingsId: settings.id,
        }));
        return user;
    }
    async signOut(token) {
        const result = await this.tokenRepository.delete({ token });
        if (result.affected === 0) {
            return OAuthError.INVALID_GRANT;
        }
        await this.redis.lpush('token', token);
        return true;
    }
    // Helper functions
    async verifyPassword(password, hashedPassword) {
        return await bcrypt_1.default.compare(password, hashedPassword);
    }
    signToken(payload) {
        return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
    }
    verifyToken(token) {
        try {
            return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        }
        catch (err) {
            return OAuthError.INVALID_GRANT;
        }
    }
};
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(constants_1.TYPES.UserRepository),
    (0, tslib_1.__metadata)("design:type", typeorm_1.Repository)
], AuthService.prototype, "userRepository", void 0);
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(constants_1.TYPES.TokenRepository),
    (0, tslib_1.__metadata)("design:type", typeorm_1.Repository)
], AuthService.prototype, "tokenRepository", void 0);
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(constants_1.TYPES.SettingsRepository),
    (0, tslib_1.__metadata)("design:type", typeorm_1.Repository)
], AuthService.prototype, "settingsRepository", void 0);
(0, tslib_1.__decorate)([
    (0, inversify_1.inject)(constants_1.TYPES.Redis),
    (0, tslib_1.__metadata)("design:type", Object)
], AuthService.prototype, "redis", void 0);
AuthService = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], AuthService);
exports.default = AuthService;
