import { Expose, Type } from 'class-transformer'
import {
    IsAlphanumeric,
    IsEmail,
    IsNotEmpty,
    NotContains,
} from 'class-validator'
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import Section from './section'
import Settings from './settings'
import Token from './token'

@Entity('user')
export default class User {
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Column({ length: 255, unique: true })
    @IsNotEmpty()
    @NotContains(' ')
    @IsAlphanumeric()
    public name!: string

    @Column({ length: 255, unique: true })
    @IsEmail()
    public email!: string

    @OneToMany(() => Token, (token) => token.user)
    public tokens?: string

    @OneToMany(() => Section, (section) => section.user)
    public sections?: Section[]

    @Column({ length: 255 })
    @IsNotEmpty()
    public password!: string

    @Expose({ name: 'settings_id' })
    @Column({ name: 'settings_id' })
    public settingsId!: number

    @Expose()
    @Type(() => Settings)
    @OneToOne(() => Settings, (settings) => settings.user)
    @JoinColumn({ name: 'settings_id' })
    public settings?: Settings
}
