import { Expose, Type } from 'class-transformer'
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import Payment from './payment'
import SubscriptionPlan from './subscription-plan'
import User from './user'

@Entity('subscription')
export default class Subscription {
    @Expose()
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Expose({ name: 'plan_id' })
    @Column({ name: 'plan_id' })
    public planId!: number

    @Expose()
    @Type(() => SubscriptionPlan)
    @ManyToOne(
        () => SubscriptionPlan,
        (subscriptionPlan) => subscriptionPlan.subscriptions
    )
    public plan?: SubscriptionPlan

    @Expose({ name: 'user_id' })
    @Column({ name: 'user_id' })
    public userId!: number

    @Expose()
    @Type(() => User)
    @ManyToOne(() => User, (user) => user.subscriptions)
    public user?: User

    @Expose()
    @Column()
    public start!: Date

    @Expose()
    @Column()
    public end!: Date | null

    @Expose()
    @OneToMany(() => Payment, (payment) => payment.subscription)
    public payments?: Payment[]
}
