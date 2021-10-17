import { EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { Recipe } from '../entities';
export declare class RecipeSubscriber implements EntitySubscriberInterface {
    listenTo(): any;
    beforeInsert(event: InsertEvent<Recipe>): Promise<void>;
    beforeUpdate(event: UpdateEvent<Recipe>): Promise<void>;
    private unpublishCopies;
}
