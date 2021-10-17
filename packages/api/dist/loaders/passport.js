"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_1 = (0, tslib_1.__importDefault)(require("passport"));
const constants_1 = require("../util/constants");
const passport_http_bearer_1 = require("passport-http-bearer");
const auth_1 = require("../services/auth");
function init(container) {
    const userRepository = container.get(constants_1.TYPES.UserRepository);
    const tokenRepository = container.get(constants_1.TYPES.TokenRepository);
    const authService = container.get(constants_1.TYPES.AuthService);
    const redis = container.get(constants_1.TYPES.Redis);
    passport_1.default.use(new passport_http_bearer_1.Strategy(function (token, done) {
        const result = authService.verifyToken(token);
        if (result === auth_1.OAuthError.INVALID_GRANT) {
            return done(null, false, { message: 'Invalid Token' });
        }
        // To reset redis:
        // redis.del(result.id)
        // redis.del('token')
        redis
            .lrange('token', 0, 999_999_999)
            .then(async (revokedTokens) => {
            if (!revokedTokens.includes(token)) {
                const userString = await redis.get(result.id);
                if (userString !== null) {
                    try {
                        const redisUser = JSON.parse(userString);
                        return done(null, redisUser);
                    }
                    catch (err) { }
                }
            }
            const tok = await tokenRepository.findOne({ token });
            if (typeof tok === 'undefined') {
                return done(null, false, { message: 'Token not found' });
            }
            const user = await userRepository.findOne({
                where: { id: result.id },
                relations: ['settings'],
                select: ['id', 'name', 'email', 'settingsId', 'settings'],
            });
            if (typeof user === 'undefined') {
                return done(null, false, { message: 'User not found' });
            }
            await redis.set(user.id, JSON.stringify(user));
            return done(null, user);
        })
            .catch((err) => console.log(err));
    }));
}
exports.default = init;
