import Application from './application';
import User from './user';
export default class Token {
    readonly id: number;
    token: string;
    createdAt: Date;
    revokedAt: Date | null;
    applicationId: number;
    application?: Application;
    userId: number;
    user?: User;
}
