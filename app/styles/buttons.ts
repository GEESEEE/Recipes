import { css, FlattenInterpolation } from 'styled-components';

import * as Spacing from './spacing';

export type ButtonType = 'Solid' | 'Outline' | 'Clear'

export const button = (type: ButtonType): string => {
    console.log(type)

    return `
        ${Spacing.borderRadius('s')}
    `
}
