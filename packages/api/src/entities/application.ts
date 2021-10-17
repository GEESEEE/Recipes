import { IsUrl } from 'class-validator'
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Generated,
} from 'typeorm'
import Token from './token'

@Entity('application')
export default class Application {
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Column()
    @Generated('uuid')
    public readonly uid!: string

    @Column({ length: 1023 })
    public name!: string

    @Column({ length: 255 })
    public secret!: string

    @Column({ name: 'redirect_uri', length: 255 })
    @IsUrl()
    public redirectUri!: string

    @Column({ default: true })
    public confidential!: boolean

    @Column({ length: 1023, default: '' })
    public scopes!: string

    @OneToMany(() => Token, (token) => token.application)
    public tokens?: Token[]
}
