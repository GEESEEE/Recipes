import { User, Settings } from '../entities';
import { ThemeType } from '../util/constants';
export default class UserService {
    private readonly userRepository;
    private readonly settingsRepository;
    getUser(id: number): Promise<User>;
    getSettings(id: number): Promise<Settings>;
    updateSettings(settings: {
        id: number;
        theme?: ThemeType;
        color?: string;
        invertedColors?: boolean;
    }): Promise<Settings>;
}
