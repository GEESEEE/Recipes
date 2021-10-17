import Token from './token';
export default class Application {
    readonly id: number;
    readonly uid: string;
    name: string;
    secret: string;
    redirectUri: string;
    confidential: boolean;
    scopes: string;
    tokens?: Token[];
}
