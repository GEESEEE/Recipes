import Section from './section';
import Settings from './settings';
export default class User {
    readonly id: number;
    name: string;
    email: string;
    tokens?: string;
    sections?: Section[];
    password: string;
    settingsId: number;
    settings?: Settings;
}
