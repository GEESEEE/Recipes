import { EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { Settings } from '../entities';
export declare class SettingsSubscriber implements EntitySubscriberInterface {
    private readonly redis;
    private readonly userRepository;
    listenTo(): any;
    afterUpdate(event: UpdateEvent<Settings>): Promise<void>;
}
