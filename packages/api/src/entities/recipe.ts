import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Expose, Type } from 'class-transformer'
import Instruction from './instruction'
import RecipeIngredient from './recipe-ingredient'
import Section from './section'

@Entity('recipe')
export default class Recipe {
    @Expose()
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Expose()
    @Column({ length: 255 })
    public name!: string

    @Expose()
    @Column({ length: 1024 })
    public description!: string

    @Expose({ name: 'prepare_time' })
    @Column({ name: 'prepare_time' })
    public prepareTime!: number

    @Expose({ name: 'people_count' })
    @Column({ name: 'people_count' })
    public peopleCount!: number

    @Expose()
    @Type(() => RecipeIngredient)
    @OneToMany(
        () => RecipeIngredient,
        (recipeIngredient) => recipeIngredient.recipe
    )
    public recipeIngredients?: RecipeIngredient[]

    @Expose()
    @Type(() => Instruction)
    @OneToMany(() => Instruction, (instruction) => instruction.recipe)
    public instructions?: Instruction[]

    @Expose({ name: 'section_id' })
    @Column({ name: 'section_id' })
    public sectionId!: number

    @Expose()
    @Type(() => Section)
    @ManyToOne(() => Section, (section) => section.recipes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'section_id' })
    public section!: Section

    @Expose({ name: 'created_at' })
    @Column('timestamp with time zone', { name: 'created_at' })
    public createdAt!: Date

    @Expose()
    @Column()
    public position!: number

    @Expose({ name: 'published_at' })
    @Column('timestamp with time zone', {
        name: 'published_at',
        nullable: true,
        default: null,
    })
    public publishedAt!: Date | null

    @Expose({ name: 'copy_of' })
    @Column({ name: 'copy_of', nullable: true, default: null })
    public copyOf!: number | null
}
