import { PureAbility, AbilityTuple, MatchConditions } from '@casl/ability';
import { User } from '../entities';
export declare type UserAbility = PureAbility<AbilityTuple, MatchConditions>;
export default function defineUserAbilities(user: User): UserAbility;
