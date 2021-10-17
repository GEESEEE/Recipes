import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Expose, Type } from 'class-transformer'
import Recipe from './recipe'

@Entity('instruction')
@Index(['recipeId', 'position'], { unique: true })
export default class Instruction {
    @Expose()
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Expose()
    @Column({ length: 255 })
    public text!: string

    @Expose()
    @Column()
    public position!: number

    @Expose({ name: 'recipe_id' })
    @Column({ name: 'recipe_id' })
    public recipeId!: number

    @Expose()
    @Type(() => Recipe)
    @ManyToOne(() => Recipe, (recipe) => recipe.instructions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'recipe_id',
    })
    public recipe?: Recipe
}
