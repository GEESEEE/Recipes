import { Expose, Type } from 'class-transformer'
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import Recipe from './recipe'
import User from './user'

@Entity('section')
export default class Section {
    @Expose()
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Expose()
    @Column({ length: 255 })
    public name!: string

    @Expose()
    @Column({ length: 1024 })
    public description!: string

    @Expose({ name: 'user_id' })
    @Column({ name: 'user_id' })
    public userId!: number

    @Expose()
    @Type(() => User)
    @ManyToOne(() => User, (user) => user.sections, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user?: User

    @OneToMany(() => Recipe, (recipe) => recipe.section)
    public recipes?: Recipe[]

    @Expose()
    @Column()
    public position!: number
}
