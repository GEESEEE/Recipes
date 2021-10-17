import * as jwt from 'jsonwebtoken';
import User from '../entities/user';
export declare enum OAuthError {
    INVALID_REQUEST = 0,
    INVALID_CLIENT = 1,
    INVALID_GRANT = 2,
    UNAUTHORIZED_CLIENT = 3,
    UNSUPPORTED_GRANT_TYPE = 4,
    INVALID_SCOPE = 5
}
export declare enum AuthError {
    USER_EXISTS = 0,
    EMAIL_EXISTS = 1
}
export default class AuthService {
    private readonly userRepository;
    private readonly tokenRepository;
    private readonly settingsRepository;
    private readonly redis;
    signUp({ name, password, email, }: {
        name: string;
        password: string;
        email: string;
    }): Promise<User | AuthError>;
    signOut(token: string): Promise<boolean | OAuthError>;
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
    signToken(payload: Record<string, unknown>): string;
    verifyToken(token: string): string | jwt.JwtPayload | OAuthError;
}
