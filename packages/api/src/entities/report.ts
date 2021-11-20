import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Expose, Type } from 'class-transformer'
import { ReportType } from '@recipes/api-types/v1'
import Recipe from './recipe'
import User from './user'

@Entity('report')
export default class Report {
    @Expose()
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Expose()
    @Column()
    public description!: string

    @Expose()
    @Column({ type: 'enum', enum: ReportType })
    public category!: ReportType

    @Expose({ name: 'recipe_id' })
    @Column({ name: 'recipe_id' })
    public recipeId!: number

    @Expose()
    @Type(() => Recipe)
    @ManyToOne(() => Recipe, (recipe) => recipe.reports)
    @JoinColumn({ name: 'recipe_id' })
    public recipe?: Recipe

    @Expose({ name: 'user_id' })
    @Column({ name: 'user_id' })
    public userId!: number

    @Expose()
    @Type(() => User)
    @ManyToOne(() => User, (user) => user.reports)
    @JoinColumn({ name: 'user_id' })
    public user?: User
}
