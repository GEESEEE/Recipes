import { Expose } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Subscription from './subscription'

@Entity('payment')
export default class Payment {
    @Expose()
    @PrimaryGeneratedColumn()
    public readonly id!: number

    @Expose({ name: 'subscription_id' })
    @Column({ type: 'int', name: 'subscription_id' })
    public subscriptionId!: number

    @Expose()
    @ManyToOne(() => Subscription, (subscription) => subscription.payments)
    public subscription?: Subscription

    @Expose()
    @Column({ type: 'float' })
    public amount!: number

    @Expose()
    @Column()
    public date!: Date
}
