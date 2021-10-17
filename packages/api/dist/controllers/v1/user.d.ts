import { Section, Settings, User } from '../../entities';
import { interfaces } from 'inversify-express-utils';
import { Request } from 'express';
import { ThemeType } from '../../util/constants';
import { ModifyError } from './base';
export default class UserController implements interfaces.Controller {
    private readonly userService;
    private readonly sectionsService;
    getUser(req: Request): Promise<User>;
    getSettings(req: Request): Promise<Settings>;
    updateSettings(req: Request, body: {
        theme?: ThemeType;
        color?: string;
        invertedColors?: boolean;
    }): Promise<Settings>;
    private validateSection;
    createSection(req: Request, body: {
        name: string;
        description: string;
    }): Promise<Section>;
    getSections(req: Request): Promise<Section[]>;
    updateSection(req: Request, sectionId: number, body: {
        name?: string;
        description?: string;
    }): Promise<Section | ModifyError>;
    deleteSection(req: Request, sectionId: number): Promise<boolean | ModifyError>;
    private static validate;
}
