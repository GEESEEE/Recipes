import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Index,
} from 'typeorm'
import { Expose, Type } from 'class-transformer'
import RecipeIngredient from './recipe-ingredient'

@Entity('ingredient')
@Index(['name', 'unit'], { unique: true })
export default class Ingredient {
    @Expose()
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Expose()
    @Column({ length: 255 })
    public name!: string

    @Expose()
    @Column('varchar', { length: 255, nullable: true })
    public unit!: string | null

    @Expose()
    @Type(() => RecipeIngredient)
    @OneToMany(
        () => RecipeIngredient,
        (recipeIngredient) => recipeIngredient.ingredient,
        { cascade: true }
    )
    public recipeIngredients?: RecipeIngredient[]
}
