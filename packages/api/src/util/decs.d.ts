import type { UserAbility } from '../abilities'
import type { User as EntityUser } from '../entities'

declare global {
    namespace Express {
        interface User extends EntityUser {
            ability?: UserAbility
        }
    }
}
