import Recipe from './recipe';
export default class Instruction {
    readonly id: number;
    text: string;
    position: number;
    recipeId: number;
    recipe?: Recipe;
}
