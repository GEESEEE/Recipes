import { EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
export declare class ValidationSubscriber implements EntitySubscriberInterface {
    beforeInsert(event: InsertEvent<any>): Promise<void>;
    beforeUpdate(event: UpdateEvent<any>): Promise<void>;
}
