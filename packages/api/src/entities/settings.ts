import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Expose } from 'class-transformer'
import { Theme } from '@recipes/api-types'
import { User } from '.'

@Entity('settings')
export default class Settings {
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Expose()
    @Column({
        type: 'enum',
        enum: Theme,
        default: Theme.DARK,
    })
    public theme!: Theme

    @Expose()
    @Column()
    public color!: string

    @Expose({ name: 'inverted_colors' })
    @Column({ name: 'inverted_colors' })
    public invertedColors!: boolean

    @Expose()
    @OneToOne(() => User, (user) => user.settings)
    public user?: User
}
