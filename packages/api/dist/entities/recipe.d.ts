import Instruction from './instruction';
import RecipeIngredient from './recipe-ingredient';
import Section from './section';
export default class Recipe {
    readonly id: number;
    name: string;
    description: string;
    prepareTime: number;
    peopleCount: number;
    recipeIngredients?: RecipeIngredient[];
    instructions?: Instruction[];
    sectionId: number;
    section: Section;
    publishedAt: Date | null;
    createdAt: Date;
    copyOf: number | null;
}
