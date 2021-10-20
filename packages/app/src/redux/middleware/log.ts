import { PayloadAction } from '@reduxjs/toolkit'

export const logMiddleware =
    (_: any) => (next: any) => (action: PayloadAction<any>) => {
        if (action.type.slice(0, 3) !== 'api') {
            console.log('Dispatching action', action.type)
        }
        return next(action)
    }
