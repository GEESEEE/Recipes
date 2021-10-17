"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const oauth2orize_1 = (0, tslib_1.__importStar)(require("oauth2orize"));
const constants_1 = require("../util/constants");
function init(container) {
    const applicationRepository = container.get(constants_1.TYPES.ApplicationRepository);
    const userRepository = container.get(constants_1.TYPES.UserRepository);
    const tokenRepository = container.get(constants_1.TYPES.TokenRepository);
    const authService = container.get(constants_1.TYPES.AuthService);
    const server = oauth2orize_1.default.createServer();
    server.serializeClient(function (client, done) {
        return done(null, client);
    });
    server.deserializeClient(function (uid, done) {
        applicationRepository
            .findOne({ where: { uid } })
            .then((client) => {
            return done(null, client);
        })
            .catch((err) => done(err));
    });
    server.exchange(oauth2orize_1.default.exchange.password({}, function (_client, username, password, _scope, body, done) {
        applicationRepository
            .findOne({ where: { uid: body.client_id } })
            .then((app) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (typeof app === 'undefined') {
                return done(new oauth2orize_1.TokenError('Unauthorized Client', 'unauthorized_client'));
            }
            else {
                const user = yield userRepository.findOne({
                    where: [
                        { name: username },
                        { email: username },
                    ],
                });
                if (typeof user === 'undefined') {
                    return done(new oauth2orize_1.TokenError('Invalid Username', 'invalid_client'));
                }
                else {
                    const validPassword = yield authService.verifyPassword(password, user.password);
                    if (validPassword) {
                        const token = authService.signToken({
                            id: user.id,
                        });
                        const tokenInstance = yield tokenRepository.save(tokenRepository.create({
                            token,
                            applicationId: app.id,
                            userId: user.id,
                        }));
                        return done(null, tokenInstance.token);
                    }
                    return done(new oauth2orize_1.TokenError('Invalid Password', 'invalid_grant'));
                }
            }
        }))
            .catch((err) => done(err));
    }));
    container.bind(constants_1.TYPES.TokenMiddleware).toConstantValue(server.token());
    return server;
}
exports.default = init;
