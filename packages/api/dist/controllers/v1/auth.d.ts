import { interfaces } from 'inversify-express-utils';
import { Request } from 'express';
import { User } from '../../entities';
export default class AuthController implements interfaces.Controller {
    private readonly authService;
    signUp(body: {
        name: string;
        password: string;
        email: string;
    }): Promise<User>;
    signIn(): void;
    verifyToken(req: Request): Promise<User>;
    signOut(headers: {
        authorization: string;
    }): Promise<boolean>;
    private static validate;
}
