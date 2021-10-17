import Faker from 'faker'
import { define } from '@zchapple/typeorm-seeding'
import { Settings } from '../entities'

define(Settings, (_faker: typeof Faker) => {
    const settings = new Settings()
    return settings
})
