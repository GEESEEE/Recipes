import Recipe from './recipe';
import User from './user';
export default class Section {
    readonly id: number;
    name: string;
    description: string;
    userId: number;
    user: User;
    recipes?: Recipe[];
}
