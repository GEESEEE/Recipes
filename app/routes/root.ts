import { createNavigationContainerRef, NavigationContainerRefWithCurrent  } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export function navigate(name: string, params?: any): void {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name as never, params as never)
    }
}

export function call(callback: keyof NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>): any {
    if (navigationRef.isReady()) {
        return navigationRef[callback]
    }
    return undefined
}

export function getTabs(): any {
    if (navigationRef.isReady()) {
        const rootState = navigationRef.getRootState()

        const drawer = rootState.routes.find(r => r.state?.type === 'drawer')
        if (typeof drawer !== 'undefined') {
            const routes = drawer?.state?.routes
            const tabs = routes?.find((r: any) => r.state?.type === 'tab')
            console.log("Tabs", tabs)
            return tabs
        }
    }
    return undefined
}
