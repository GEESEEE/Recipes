import { EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import { User } from '../entities';
export declare class UserSubscriber implements EntitySubscriberInterface {
    private readonly recipeRepository;
    listenTo(): any;
    beforeInsert(event: InsertEvent<User>): Promise<void>;
    beforeUpdate(event: UpdateEvent<User>): Promise<void>;
    BeforeRemove(event: RemoveEvent<User>): Promise<void>;
    private hashPassword;
}
