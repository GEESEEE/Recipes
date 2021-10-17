import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Expose, Type } from 'class-transformer'
import Ingredient from './ingredient'
import Recipe from './recipe'

@Entity('recipe_ingredient')
@Index(['recipeId', 'ingredientId'], { unique: true })
@Index(['recipeId', 'position'], { unique: true })
export default class RecipeIngredient {
    @Expose()
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Expose({ name: 'recipe_id' })
    @Column({ name: 'recipe_id' })
    public recipeId!: number

    @Expose({ name: 'ingredient_id' })
    @Column({ name: 'ingredient_id' })
    public ingredientId!: number

    @Expose()
    @Column('float')
    public amount!: number

    @Expose()
    @Column()
    public position!: number

    @Expose()
    @Type(() => Recipe)
    @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'recipe_id' })
    public recipe?: Recipe

    @Expose()
    @Type(() => Ingredient)
    @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'ingredient_id' })
    public ingredient?: Ingredient
}
