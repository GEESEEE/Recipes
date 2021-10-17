import { User } from '.';
export default class Settings {
    readonly id: number;
    theme: string;
    color: string;
    invertedColors: boolean;
    user?: User;
}
