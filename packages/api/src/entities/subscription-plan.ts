import { Expose, Type } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Subscription from './subscription'

@Entity('subscription_plan')
export default class SubscriptionPlan {
    @Expose()
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Expose()
    @Column()
    public name!: string

    @Expose({ name: 'cost_per_month' })
    @Column({ type: 'float', name: 'cost_per_month' })
    public costPerMonth!: number

    @Expose()
    @Type(() => Subscription)
    @OneToMany(() => Subscription, (subscription) => subscription.plan)
    public subscriptions?: Subscription[]
}
