import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import Application from './application'
import User from './user'

@Entity('token')
export default class Token {
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Column({ length: 1023, unique: true })
    public token!: string

    @Column('timestamp with time zone', {
        name: 'created_at',
        default: () => 'NOW()',
    })
    public createdAt!: Date

    @Column('timestamp with time zone', { name: 'revoked_at', nullable: true })
    public revokedAt!: Date | null

    @Column({ name: 'application_id' })
    public applicationId!: number

    @ManyToOne(() => Application, (application) => application.tokens, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'application_id' })
    public application?: Application

    @Column({ name: 'user_id' })
    public userId!: number

    @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user?: User
}
