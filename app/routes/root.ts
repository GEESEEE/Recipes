import { createNavigationContainerRef, NavigationContainerRefWithCurrent  } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export function isReady(): boolean {
    return navigationRef.isReady()
}

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
