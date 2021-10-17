import {
    PureAbility,
    AbilityBuilder,
    AbilityTuple,
    MatchConditions,
    AbilityClass,
} from '@casl/ability'
import { Recipe, Section, User } from '../entities'

export type UserAbility = PureAbility<AbilityTuple, MatchConditions>
const Ability = PureAbility as AbilityClass<UserAbility>
const lambdaMatcher = (matchConditions: MatchConditions): any => matchConditions

export default function defineUserAbilities(user: User): UserAbility {
    const { can, build } = new AbilityBuilder(Ability)

    // Users can only read Recipes from other people if they are published
    can(
        'read',
        'Recipe',
        ({
            publishedAt,
            section,
        }: {
            publishedAt: Date | null
            section: Section
        }) => publishedAt !== null && section.userId !== user.id
    )

    // Users can only manage recipes, instructions and recipeIngredients from themselves
    can(
        'manage',
        'Section',
        ({ userId }: { userId: number }) => userId === user.id
    )
    can(
        'manage',
        'Recipe',
        ({ section }: { section: Section }) => section.userId === user.id
    )
    can(
        'manage',
        'Instruction',
        ({ recipe }: { recipe: Recipe }) => recipe.section.userId === user.id
    )
    can(
        'manage',
        'RecipeIngredient',
        ({ recipe }: { recipe: Recipe }) => recipe.section.userId === user.id
    )

    return build({ conditionsMatcher: lambdaMatcher })
}
