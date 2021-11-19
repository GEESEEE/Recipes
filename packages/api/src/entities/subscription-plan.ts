import { TimePeriod } from '@recipes/api-types/v1'
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

    @Expose({ name: 'cost_per_period' })
    @Column({ type: 'float', name: 'cost_per_period' })
    public costPerPeriod!: number

    @Expose({ name: 'time_period' })
    @Column({ type: 'enum', enum: TimePeriod, name: 'time_period' })
    public timePeriod!: TimePeriod

    @Expose()
    @Type(() => Subscription)
    @OneToMany(() => Subscription, (subscription) => subscription.plan)
    public subscriptions?: Subscription[]
}
